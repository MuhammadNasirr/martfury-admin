import { PAGE_LIMIT } from "../config/constants";
import langModel from "../models/Language";

export const createLang = async (payload) => {
  const lang = new langModel(payload);
  const langData = await lang.save();
  console.log(langData);
  return { status: "success", message: "Successfully created" };
};

export const getLang = async () => {
  const langs = await langModel.find().select("-data");

  return {
    status: "success",
    data: langs,
  };
};

export const getAllLocale = async () => {
  const langs = await langModel.find();

  return {
    status: "success",
    data: langs,
  };
};

export const getLocaleById = async (id) => {
  const langs = await langModel.findOne({ _id: id });

  return {
    status: "success",
    data: langs,
  };
};

export const updateLocale = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  let keys = Object.keys(payload);
  let query = {};
  keys.forEach((key) => {
    query["data." + key] = payload[key];
  });
  const Ad = await langModel.updateOne(
    { _id: id },
    { $set: { ...query } },
    { runValidators: true }
  );
  if (Ad.n > 0)
    return {
      status: "success",
      message: "Data Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid DataId",
    };
};

export const deleteLang = async (id) => {
  const lang = await langModel.deleteOne({ _id: id, isDefault: false });
  console.log(lang);
  if (lang.n > 0)
    return {
      status: "success",
      message: "Language Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid LanguageId",
    };
};
