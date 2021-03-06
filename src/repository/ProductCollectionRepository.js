import { PAGE_LIMIT } from "../config/constants";
import Product from "../models/Product";
import Model from "../models/ProductCollection";
import ProductVariants from "../models/ProductVariants";

const modelName = "Product Collection";

export const create = async (payload) => {
  const model = new Model(payload);
  const modelData = await model.save();
  console.log(modelData);
  return { status: "success", message: "Successfully created" };
};

export const get = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const collection = await Model.find({ ...query })
    .select("id name slug image status createdAt")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await Model.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      collection,
      count,
      currentPage: page + 1,
    },
  };
};

export const getAllPublished = async (userId) => {
  const collection = await Model.find({ status: "Published" }).select(
    "id name"
  );

  return {
    status: "success",
    data: collection,
  };
};

export const getCollection = async (id) => {
  const collection = await Model.findOne({ id: id, status: "Published" });
  let product = [];
  let data = null;
  if (collection) {
    product = await Product.find({ productCollection: collection._id })
      .populate({ path: "categories" })
      .populate({ path: "brand" })
      .populate({ path: "productCollection" })
      .populate({ path: "tax" })
      .populate("attributes")
      .populate("tags.tagId")
      .lean();

    for (let i = 0; i < product.length; i++) {
      product[i].variants = await ProductVariants.find({
        productId: product[i]._id,
      }).lean();
    }
  }

  data = await collection.toJSON();
  data = { ...data, product };

  return {
    status: "success",
    data: data,
  };
};

export const getCollectionBySlug = async (id) => {
  const collection = await Model.findOne({ slug: id, status: "Published" });
  let product = [];
  let data = null;
  if (collection) {
    product = await Product.find({ productCollection: collection._id })
      .populate({ path: "categories" })
      .populate({ path: "brand" })
      .populate({ path: "productCollection" })
      .populate({ path: "tax" })
      .populate("attributes")
      .populate("tags.tagId")
      .lean();

    for (let i = 0; i < product.length; i++) {
      product[i].variants = await ProductVariants.find({
        productId: product[i]._id,
      }).lean();
    }

    data = await collection.toJSON();
    data = { ...data, product };
  }
  return {
    status: "success",
    data: data,
  };
};

export const getAllCollection = async (query) => {
  const collectionAll = await Model.find({ status: "Published", ...query });
  let product = [];
  let data = [];
  if (collectionAll.length) {
    for (let j = 0; j < collectionAll.length; j++) {
      let collection = collectionAll[j];

      product = await Product.find({ productCollection: collection._id })
        .populate({ path: "categories" })
        .populate({ path: "brand" })
        .populate({ path: "productCollection" })
        .populate({ path: "tax" })
        .populate("attributes")
        .populate("tags.tagId")
        .lean();

      for (let i = 0; i < product.length; i++) {
        product[i].variants = await ProductVariants.find({
          productId: product[i]._id,
        }).lean();
      }

      data.push(await collection.toJSON());
      data[data.length - 1].product = product;
    }
  }

  return {
    status: "success",
    data: data,
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
