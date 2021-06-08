import { PAGE_LIMIT } from "../config/constants";
import Model from "../models/Product";
import ProductVariants from "../models/ProductVariants";
import Review from "../models/Review";

const modelName = "Product";

export const create = async (payload) => {
  // name,
  //   description,
  //   content,
  //   images,
  //   sku,
  //   price,
  //   salePrice,
  //   discountDate,
  //   inStore,
  //   quantity,
  //   stockStatus,
  //   allowCheckout,
  //   shipping,
  //   attributes,
  //   status,
  //   order,
  //   isFeatured,
  //   categories,
  //   tags,
  //   brand,
  //   productCollection,
  //   tax,
  //   createdAt: new Date(),
  let attributes = payload.attributes;
  let variant = null;
  payload.attributes = payload.attributes?.map((a) => a.attributeId);
  const model = new Model(payload);
  const modelData = await model.save();
  console.log(modelData);
  if (payload.attributes?.length) {
    variant = {
      images: payload.images,
      sku: payload.sku,
      price: payload.price,
      salePrice: payload.salePrice,
      discountDate: payload.discountDate,
      inStore: payload.inStore,
      quantity: payload.quantity,
      stockStatus: payload.stockStatus,
      allowCheckout: payload.allowCheckout,
      shipping: payload.shipping,
      attributes: attributes,
      productId: modelData._id,
    };

    let mongoVariant = new ProductVariants(variant);
    variant = await mongoVariant.save();
  }

  return { status: "success", message: "Successfully created" };
};

export const createVariation = async (id, payload) => {
  let pro = await Model.findOne({ id: id });
  if (!pro) {
    throw { status: "fail", message: "Product does not exist" };
  }
  let variant = {
    images: payload.images,
    sku: payload.sku,
    price: payload.price,
    salePrice: payload.salePrice,
    discountDate: payload.discountDate,
    inStore: payload.inStore,
    quantity: payload.quantity,
    stockStatus: payload.stockStatus,
    allowCheckout: payload.allowCheckout,
    shipping: payload.shipping,
    attributes: payload.attributes,
    productId: pro._id,
  };

  let mongoVariant = new ProductVariants(variant);
  variant = await mongoVariant.save();

  return { status: "success", message: "Successfully created" };
};
export const get = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const products = await Model.find({ ...query })
    .select(
      "id name images price salePrice quanitity inStore sku status createdAt"
    )
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await Model.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      products,
      count,
      currentPage: page + 1,
    },
  };
};

export const getProductsWithVariant = async (page, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const products = await Model.find({ ...query })
    .select()
    .populate({ path: "categories" })
    .populate({ path: "brand" })
    .populate({ path: "productCollection" })
    .populate({ path: "tax" })
    .populate("attributes")
    .populate("tags.tagId")
    .sort("order")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page)
    .lean();
  for (let i = 0; i < products.length; i++) {
    products[i].variants = await ProductVariants.find({
      productId: products[i]._id,
    });
  }
  const count = await Model.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      products,
      count,
      currentPage: page + 1,
    },
  };
};

export const getPublishedProducts = async (page, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  if (query.discountDate) {
    let discountDate = JSON.parse(query.discountDate);
    console.log(discountDate);
    discountDate = {
      from: new Date(query.discountDate.from),
      to: new Date(query.discountDate.to),
    };

    query["product.discountDate.from"] = { $gte: discountDate.from };
    query["product.discountDate.to"] = { $lte: discountDate.to };
    delete query.discountDate;
  }
  if (query.brand) {
    query.brand = { $in: query.brand.split(",") };
  }
  if (query.categories) {
    query.categories = { $in: query.categories.split(",") };
  }
  if (query.productCollection) {
    query.productCollection = { $in: query.productCollection.split(",") };
  }
  console.log(query);
  const products = await Model.find({ ...query, status: "Published" })
    .populate({ path: "categories" })
    .populate({ path: "brand" })
    .populate({ path: "productCollection" })
    .populate({ path: "tax" })
    .populate("attributes")
    .populate("tags.tagId")
    .sort("order")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  let pro = JSON.parse(JSON.stringify(products));
  console.log(pro);

  // products = products.toJSON();
  for (let i = 0; i < products.length; i++) {
    const reviews = await Review.countDocuments({ product: products[i]._id });

    // product.reviewCount = reviews;
    const avgRating = await Review.aggregate([
      {
        $match: { product: products[i]._id },
      },
      {
        $group: { _id: products[i]._id, average: { $avg: "$stars" } },
      },
    ]);
    pro[i].reviewCount = reviews;
    pro[i].averageRating = avgRating.length ? avgRating[0].average : 0;
  }
  const count = await Model.countDocuments({ ...query, status: "Published" });

  return {
    status: "success",
    data: {
      products: pro,
      count,
      currentPage: page + 1,
    },
  };
};

export const getDealsOfTheDay = async (query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  if (query.dealDate) {
    const date = new Date(query.dealDate);
    query["discountDate.from"] = { $lte: date };
    query["discountDate.to"] = { $gte: date };
    delete query.dealDate;
  }

  console.log(query);
  const productVariants = await ProductVariants.find({ ...query })
    .select("id name images price salePrice isFeatured categories discountDate")
    .populate({
      path: "productId",
      select: ["status", "name", "description", "content"],
    });
  console.log(productVariants);
  const products = productVariants.map((prod) => {
    if (prod.productId.status === "Published") {
      let tempProd = {
        ...prod.toJSON(),
        name: prod.productId.name,
        description: prod.productId.description,
        content: prod.productId.content,
      };
      delete tempProd.productId.name;
      delete tempProd.productId.description;
      delete tempProd.productId.content;

      return tempProd;
    }
  });

  let pro = JSON.parse(JSON.stringify(products));
  console.log(pro);
  // products = products.toJSON();
  for (let i = 0; i < products.length; i++) {
    const reviews = await Review.countDocuments({
      product: products[i].productId._id,
    });

    // product.reviewCount = reviews;
    const avgRating = await Review.aggregate([
      {
        $match: { product: products[i].productId._id },
      },
      {
        $group: { _id: products[i].productId._id, average: { $avg: "$stars" } },
      },
    ]);
    pro[i].reviewCount = reviews;
    pro[i].averageRating = avgRating.length ? avgRating[0].average : 0;
  }
  const count = await Model.countDocuments({ ...query, status: "Published" });

  return {
    status: "success",
    data: {
      products: pro,
    },
  };
};

export const getAllPublished = async (query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const product = await Model.find({ status: "Published", ...query })
    .populate({ path: "categories" })
    .populate({ path: "brand" })
    .populate({ path: "productCollection" })
    .populate({ path: "tax" })
    .populate("attributes")
    .populate("tags.tagId");

  return {
    status: "success",
    data: product,
  };
};

export const getDetails = async (id, userId) => {
  const product = await Model.findOne({ id: id })
    .populate({ path: "categories" })
    .populate({ path: "brand" })
    .populate({ path: "productCollection" })
    .populate({ path: "tax" })
    .populate("attributes")
    .populate("tags.tagId");
  if (!product) {
    throw { status: "fail", message: "Product does not exist" };
  }
  const variation = await ProductVariants.find({
    productId: product._id,
  });

  return {
    status: "success",
    data: {
      product,
      variation,
    },
  };
};

export const getVariations = async (id, userId) => {
  const product = await Model.findOne({ id: id });

  if (!product) {
    throw { status: "fail", message: "Product does not exist" };
  }
  const variation = await ProductVariants.find({
    productId: product._id,
  });

  return {
    status: "success",
    data: {
      variation,
    },
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

export const updateVariation = async (id, payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const collection = await ProductVariants.updateOne(
    { _id: id },
    { ...payload },
    { runValidators: true }
  );
  if (collection.n > 0)
    return {
      status: "success",
      message: "Product Variation" + " Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Invalid " + "Product Variation" + "Id",
    };
};

export const deleteModel = async (id) => {
  let _id = (await Model.findOne({ id: id }).select("_id"))._id;
  const collection = await Model.deleteOne({ id: id });
  console.log(collection);
  if (collection.n > 0) {
    const v = await ProductVariants.deleteMany({ productId: _id });
    return {
      status: "success",
      message: modelName + " Successfully deleted",
    };
  } else
    return {
      status: "fail",
      message: "Invalid " + modelName + "Id",
    };
};

export const deleteVariation = async (id) => {
  const collection = await ProductVariants.deleteOne({ _id: id });
  console.log(collection);
  if (collection.n > 0) {
    return {
      status: "success",
      message: "Product Variation" + " Successfully deleted",
    };
  } else
    return {
      status: "fail",
      message: "Invalid " + "Product Variation" + "Id",
    };
};
