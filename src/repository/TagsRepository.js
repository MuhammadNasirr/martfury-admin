import { PAGE_LIMIT } from "../config/constants";
import Product from "../models/Product";
import tagModel from "../models/Tags";

export const createTag = async (payload) => {
  const tag = new tagModel(payload);
  const tagData = await tag.save();
  console.log(tagData);
  return { status: "success", message: "Successfully created" };
};

export const getTags = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  // if (query.search) {
  //   query["$text"] = {
  //     $search: query.search,
  //   };
  //   delete query.search;
  // }
  const tags = await tagModel
    .find({ ...query })
    .select("id name status createdAt")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await tagModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      tags,
      count,
      currentPage: page + 1,
    },
  };
};

export const getPublishedTags = async (userId) => {
  const tags = await tagModel.find({ status: "Published" }).select("id name ");

  return {
    status: "success",
    data: tags,
  };
};

export const getPublishedTagsWithProductCount = async (userId) => {
  const tags = await tagModel.find().select("id name ");
  // for (let i = 0; i < tags.length; i++) {
  //   tags[i].productCount = (
  //     await Product.find({ "tags.tagId": tags[i]._id })
  //   ).length;
  // }
  return {
    status: "success",
    data: tags,
  };
};

export const getTagDetails = async (id, userId) => {
  const tag = await tagModel.findOne({ id: id }).select("-author");

  return {
    status: "success",
    data: tag,
  };
};

export const updateTag = async (id, payload, userId) => {
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

export const deleteTag = async (id, userId) => {
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
