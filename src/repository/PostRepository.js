import { PAGE_LIMIT } from "../config/constants";
import postModel from "../models/Posts";

export const createPost = async (payload) => {
  const cat = new postModel(payload);
  const catData = await cat.save();
  console.log(catData);
  return { status: "success", message: "Successfully created" };
};

export const getPosts = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const cats = await postModel
    .find({ ...query })
    .select("id name categories createdAt status author")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page)
    .populate({
      path: "categories",
      select: { name: 1 },
    })
    .populate({
      path: "author",
      select: { name: 1 },
    });

  const count = await postModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      posts: cats,
      count,
      currentPage: page + 1,
    },
  };
};

export const getPostDetails = async (id, userId) => {
  const cat = await postModel
    .findOne({ id: id })
    // .populate({
    //   path: "categories",
    //   select: { name: 1, id: 1 },
    // })
    .populate({
      path: "tags",
      select: { name: 1, id: 1 },
    })
    .populate({
      path: "author",
      select: { name: 1 },
    });

  return {
    status: "success",
    data: cat,
  };
};

export const updatePost = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const cat = await postModel.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (cat.n > 0)
    return {
      status: "success",
      message: "Post Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid PostId",
    };
};

export const deletePost = async (id, userId) => {
  const cat = await postModel.deleteOne({ id: id });
  console.log(cat);
  if (cat.n > 0)
    return {
      status: "success",
      message: "Post Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid PostId",
    };
};
