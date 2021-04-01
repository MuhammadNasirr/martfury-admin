import { PAGE_LIMIT } from "../config/constants";
import Model from "../models/SocialLogin";

const modelName = "Social Login";

export const create = async (payload) => {
  const model = new Model(payload);
  const modelData = await model.save();
  console.log(modelData);
  return { status: "success", message: "Successfully created" };
};

export const get = async () => {
  const socialLogin = await Model.findOne().select("-_id -__v");

  return {
    status: "success",
    data: {
      socialLogin,
    },
  };
};

export const getAllEnabled = async (userId) => {
  const socialLogin = await Model.findOne({
    isEnabled: true,
  }).select("-_id -__v");
  let s = socialLogin.toJSON();
  s.socialLogins = s.socialLogins.filter((d) => d.isEnabled);

  return {
    status: "success",
    data: { socialLogin: s },
  };
};

export const setEnable = async (isEnabled) => {
  const collection = await Model.updateOne(
    { id: 1 },
    { isEnabled: isEnabled },
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
      message: "Nothing to Update",
    };
};

export const addLogin = async (payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const collection = await Model.updateOne(
    { id: 1 },
    { $push: { socialLogins: payload } },
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

export const removeLogin = async (id) => {
  const collection = await Model.updateOne(
    { id: 1 },
    { $pull: { socialLogins: { _id: id } } },
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

export const updateLogin = async (id, payload) => {
  let query = {};
  const keys = Object.keys(payload);
  keys.forEach((key) => {
    query["socialLogins.$." + key] = payload[key];
  });
  const collection = await Model.updateOne(
    { id: 1, "socialLogins._id": id },
    { $set: { ...query } },
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
