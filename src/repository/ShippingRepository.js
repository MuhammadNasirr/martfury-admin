import { PAGE_LIMIT } from "../config/constants";
import Model from "../models/Shipping";

const modelName = "Shipping";

export const create = async (payload) => {
  const model = new Model(payload);
  const modelData = await model.save();
  console.log(modelData);
  return { status: "success", message: "Successfully created" };
};

export const get = async (page, userId, query) => {
  const shipping = await Model.find({ ...query });

  const count = await Model.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      shipping,
      count,
      currentPage: page + 1,
    },
  };
};

// export const getAllPublished = async (userId) => {
//   const shipping = await Model.find({ status: "Published" }).select("id name");

//   return {
//     status: "success",
//     data: shipping,
//   };
// };

// export const getDetails = async (id, userId) => {
//   const shipping = await Model.findOne({ id: id }).select("-author");

//   return {
//     status: "success",
//     data: shipping,
//   };
// };

export const addRule = async (id, payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const shipping = await Model.updateOne(
    { _id: id },
    { $push: { rules: payload } },
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

export const deleteRule = async (id, ruleId) => {
  const shipping = await Model.updateOne(
    { _id: id },
    { $pull: { rules: { _id: ruleId } } },
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

export const updateRule = async (id, ruleId, payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }

  let query = {};

  for (const [key, value] of Object.entries(payload)) {
    query["rules.$." + key] = value;
  }

  const shipping = await Model.updateOne(
    { _id: id, "rules._id": ruleId },
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
  const shipping = await Model.deleteOne({ _id: id });
  console.log(shipping);
  if (shipping.n > 0)
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
