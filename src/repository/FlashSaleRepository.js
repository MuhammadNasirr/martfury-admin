import { PAGE_LIMIT } from "../config/constants";
import Model from "../models/FlashSale";

const modelName = "ٖFlash Sale";

export const create = async (payload) => {
  const model = new Model(payload);
  const modelData = await model.save();
  console.log(modelData);
  return { status: "success", message: "Successfully created" };
};

export const get = async (page, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const flashSale = await Model.find()
    .select("id name status createdAt")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await Model.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      flashSale,
      count,
      currentPage: page + 1,
    },
  };
};

export const getAllPublished = async (userId) => {
  const flashSale = await Model.find({ status: "Published" }).select("id name");

  return {
    status: "success",
    data: flashSale,
  };
};

export const getDetails = async (id, userId) => {
  const flashSale = await Model.findOne({ id: id }).populate({
    path: "products.product",
  });

  return {
    status: "success",
    data: flashSale,
  };
};

export const update = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  if (payload.products) {
    delete payload.productsß;
  }
  const flashSale = await Model.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (flashSale.n > 0)
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

export const addProduct = async (id, payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  if (payload.products) {
    delete payload.productsß;
  }
  const flashSale = await Model.updateOne(
    { id: id },
    { $push: { products: payload } },
    { runValidators: true }
  );
  if (flashSale.n > 0)
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

export const removeProduct = async (id, productId) => {
  const flashSale = await Model.updateOne(
    { id: id },
    { $pull: { products: { product: productId } } },
    { runValidators: true }
  );
  if (flashSale.n > 0)
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

export const updateProduct = async (id, productId, payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }

  let query = {};

  for (const [key, value] of Object.entries(payload)) {
    query["products.$." + key] = value;
  }

  const shipping = await Model.updateOne(
    { id: id, "products.product": productId },
    { $set: { ...query } },
    { runValidators: true }
  );
  if (shipping.n > 0)
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
  const flashSale = await Model.deleteOne({ id: id });
  console.log(flashSale);
  if (flashSale.n > 0)
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
