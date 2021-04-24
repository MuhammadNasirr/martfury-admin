import { PAGE_LIMIT } from "../config/constants";
import catModel from "../models/ProductCategory";

export const createCat = async (payload) => {
  const cat = new catModel(payload);
  const catData = await cat.save();
  console.log(catData);
  return { status: "success", message: "Successfully created" };
};

export const getCats = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const cats = await catModel
    .find({ ...query })
    .select("id name status createdAt ")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await catModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      cats,
      count,
      currentPage: page + 1,
    },
  };
};

export const getPublishedCategory = async (page, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const cats = await catModel
    .find({ ...query, status: "Published" })
    .select("id name image")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await catModel.countDocuments({
    ...query,
    status: "Published",
  });

  return {
    status: "success",
    data: {
      cats,
      count,
      currentPage: page + 1,
    },
  };
};

export const getAllPublishedCats = async (userId) => {
  const cats = await catModel.find({ status: "Published" }).select("id name");

  return {
    status: "success",
    data: cats,
  };
};

export const getCatDetails = async (id, userId) => {
  const cat = await catModel
    .findOne({ id: id })
    .populate({
      path: "parent",
      select: { name: 1 },
    })
    .select("-author");

  return {
    status: "success",
    data: cat,
  };
};

export const updateCat = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const cat = await catModel.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (cat.n > 0)
    return {
      status: "success",
      message: "Category Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid CategoryId",
    };
};

export const deleteCat = async (id, userId) => {
  const cat = await catModel.deleteOne({ id: id });
  console.log(cat);
  if (cat.n > 0)
    return {
      status: "success",
      message: "Category Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid categoryId",
    };
};
