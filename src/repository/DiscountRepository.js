import { PAGE_LIMIT } from "../config/constants";
import Model from "../models/Discount";

const modelName = "Discount";

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
  const discount = await Model.find({ ...query })
    .select(
      "id code discount applyOn couponType startDate endDate collectionId productId variantId customerId"
    )
    .populate(["collectionId", "productId", "variantId", "customerId"])
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);
  // console.log("discount", discount);
  const count = await Model.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      discount,
      count,
      currentPage: page + 1,
    },
  };
};

export const getDiscountbyCode = async (code) => {
  const discount = await Model.findOne({ code: code }).populate([
    "collectionId",
    "productId",
    "variantId",
    "customerId",
  ]);

  return {
    status: "success",
    data: {
      discount,
    },
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
