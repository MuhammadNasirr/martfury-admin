import { PAGE_LIMIT } from "../config/constants";
import tagModel from "../models/Tags";

export const createTag = async (payload) => {
  const tag = new tagModel(payload);
  const tagData = await tag.save();
  console.log(tagData);
  return { status: "success", message: "Successfully created" };
};

export const getTags = async (page) => {
  const tags = await tagModel
    .find()
    .select("id name status createdAt")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await tagModel.countDocuments();

  return {
    status: "success",
    data: {
      tags,
      count,
      currentPage: page + 1,
    },
  };
};

export const getTagDetails = async (id) => {
  const tag = await tagModel.findOne({ id: id }).select("-author");

  return {
    status: "success",
    data: tag,
  };
};

export const updateTag = async (id, payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const tag = await tagModel.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (tag.n > 0)
    return {
      status: "success",
      message: "Tag Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid TagId",
    };
};

export const deleteTag = async (id) => {
  const tag = await tagModel.deleteOne({ id: id });
  console.log(tag);
  if (tag.n > 0)
    return {
      status: "success",
      message: "Tag Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid TagId",
    };
};
