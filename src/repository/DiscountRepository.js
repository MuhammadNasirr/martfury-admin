import { PAGE_LIMIT } from "../config/constants";
import Model from "../models/Discount";

const modelName = "Discount";

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
  const collection = await Model.find()
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
