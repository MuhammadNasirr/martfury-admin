import { PAGE_LIMIT } from "../config/constants";
import settingsModel from "../models/Settings";

export const createSettings = async (payload) => {
  const settings = new settingsModel(payload);
  const settingsData = await settings.save();
  console.log(settingsData);
  return { status: "success", message: "Successfully created" };
};

export const getSettings = async () => {
  const settings = await settingsModel.findOne().select("-author");

  return {
    status: "success",
    data: settings,
  };
};

export const updateSetting = async (payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const Ad = await settingsModel.updateOne(
    {},
    { ...payload },
    { runValidators: true }
  );
  if (Ad.n > 0)
    return {
      status: "success",
      message: "Settings Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Failed to update or no chaange",
    };
};
