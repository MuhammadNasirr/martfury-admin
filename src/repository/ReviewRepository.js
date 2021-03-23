import { PAGE_LIMIT } from "../config/constants";
import Model from "../models/Review";

const modelName = "Review";

export const create = async (payload) => {
  const model = new Model(payload);
  const modelData = await model.save();
  console.log(modelData);
  return { status: "success", message: "Successfully created" };
};

export const get = async (page, userId, query) => {
  if (query.comment) {
    query.comment = { $regex: query.comment, $options: "i" };
  }
  const review = await Model.find({ ...query })
    .select("id star comment status createdAt")
    .populate({ path: "customer", select: { name: 1 } })
    .populate({ path: "product", select: { name: 1 } })
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await Model.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      review,
      count,
      currentPage: page + 1,
    },
  };
};

export const getAllPublished = async (userId) => {
  const review = await Model.find({ status: "Published" })
    .populate({ path: "customer", select: { name: 1 } })
    .populate({ path: "product", select: { name: 1 } });

  return {
    status: "success",
    data: review,
  };
};

export const getReviewByProduct = async (productId) => {
  console.log(productId);
  const review = await Model.find({ product: productId })
    .populate({ path: "customer", select: { name: 1 } })
    .populate({ path: "product", select: { name: 1 } });
  return {
    status: "success",
    data: review,
  };
};

export const getReviewByCustomer = async (customerId) => {
  const review = await Model.find({ customer: customerId })
    .populate({ path: "customer", select: { name: 1 } })
    .populate({ path: "product", select: { name: 1 } });
  return {
    status: "success",
    data: review,
  };
};

export const deleteModel = async (id) => {
  const review = await Model.deleteOne({ id: id });
  console.log(review);
  if (review.n > 0)
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
