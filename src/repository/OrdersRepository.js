import { PAGE_LIMIT } from "../config/constants";
import Model from "../models/Order";
import Product from "../models/Product";
import ProductVariants from "../models/ProductVariants";
import Tax from "../models/Tax";
import * as ProductsRepository from '../repository/ProductsRepository'

const modelName = "Product Collection";

export const create = async (payload) => {
    const {customer,paymentMethod,products,note,couponCode} = payload
    const order = {
        customer,
        paymentMethod,
        note: note || '',
        product:[]
    }
    let productTotal = 0;
    const productIds = products.map(pro=>{
            return pro.id
       
    });
    const productDetails = await Product.find({'id': { $in: productIds}}).lean();
    const variants = []
    for(let i=0; i<productDetails.length; i++) {
        let pro = productDetails[i];
        const index = products.findIndex(a=>a.id === pro.id)
        console.log(products[index].variantId)
        if(products[index].variantId){
            const variant  = (await ProductVariants.findOne({_id:products[index].variantId}).lean())
            let from = new Date(variant.discountDate.from);
            let to = new Date(variant.discountDate.to);
            const price = variant.price
            if(Date.now()>=from.getTime() && Date.now() <= to.getTime()){
                price = variant.salePrice;
            }
            if(variant.inStore && variant.quantity >= products[index].quantity){
                variant.quantity -= products[index].quantity
            }
            else if(!variant.inStore &&  variant.stockStatus !== 'Out of Stock'){
    
            }
            else{
                throw {message:`Product: ${variant.name} Out of Stock`}
            }
            variants.push(variant);
            order.product.push({
                productDetail: pro._id,
                variantId: variant._id,
                quantity:products[index].quantity,
                price: price

            })
            productTotal += price* products[index].quantity
        }
        else {
        let from = new Date(pro.discountDate.from);
        let to = new Date(pro.discountDate.to);
        const price = pro.price
        if(Date.now()>=from.getTime() && Date.now() <= to.getTime()){
            price = pro.salePrice;
        }
        if(pro.inStore && pro.quantity >= products[index].quantity){
            productDetails[i].quantity -= products[index].quantity
        }
        else if(!pro.inStore &&  pro.stockStatus !== 'Out of Stock'){

        }
        else{
            throw {message:`Product: ${pro.name} Out of Stock`
        }}

        productTotal += price* products[index].quantity
        order.product.push({
            productDetail: pro._id,
            variantId: null,
            quantity:products[index].quantity,
            price: price

        })
    }
    }
    order.subAmount = productTotal;
    order.shippingAmount = 0;
    order.paymentStatus = 'Pending';
    order.status = 'Pending';
    order.shippingStatus = 'Picking';
    order.discount = 0;

    
    const tax = await Tax.findOne().sort({priority:1}).lean();
    if(tax);
    order.tax = tax.taxPercent;

    order.totalAmount = order.subAmount + (order.subAmount * order.tax/100)
    
    productDetails.forEach((pro,index)=>{
        ProductsRepository.update(pro.id,{quantity:pro.quantity});
    })
    variants.forEach(variant=>{
        ProductsRepository.updateVariation(variant._id,{quantity:variant.quantity})
    })

    const model = new Model(order);
    const modelData = await model.save();
    console.log(modelData);
    return { status: "success", message: "Successfully created" };
};

export const get = async (page, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const orders = await Model.find({ ...query })
    .select()
    .populate({path:'customer', select:'firstName lastName userId'})
    .populate({path:'product.productDetail', select:'name description images'})
    .populate({path: 'product.variantId', select:'name description images'})
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await Model.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      orders,
      count,
      currentPage: page + 1,
    },
  };
};


export const getDetails = async (id, userId) => {
  const collection = await Model.findOne({ id: id }).select("-author");

  return {
    status: "success",
    data: collection,
  };
};

export const update = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const collection = await Model.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (collection.n > 0)
    return {
      status: "success",
      message: modelName + " Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Invalid " + modelName + "Id",
    };
};

export const deleteModel = async (id) => {
  const collection = await Model.deleteOne({ id: id });
  console.log(collection);
  if (collection.n > 0)
    return {
      status: "success",
      message: modelName + " Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Invalid " + modelName + "Id",
    };
};
