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

  let success = [];
  for (let i = 0; i < payload.length; i++) {
    let obj = payload[i];
    if (obj.id) {
      let query = {};

      let keys = Object.keys(obj);
      keys.forEach((key) => {
        if (key !== "id") {
          query["data.$." + key] = obj[key];
        }
      });
      let data = await langModel.updateOne(
        { _id: id, "data.id": obj.id },
        { ...query },
        { runValidators: true }
      );
      if (!data.n) {
        success.push("invalid Data Id , id:" + obj.id);
      }
    } else if (obj.id === undefined) {
      let data = await langModel.updateOne(
        { _id: id },
        {
          $push: {
            data: {
              id: (await langModel.findOne({ _id: id })).data.length,
              ...obj,
            },
          },
        },
        { runValidators: true }
      );
      if (!data.n) {
        success.push("Failed to add Data");
      }
    }
  }

  if (success.length)
    return {
      status: "fail",
      message: success.join(" \n "),
    };
  return {
    status: "success",
    message: "Data Successfully updated",
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
