import { PAGE_LIMIT } from "../config/constants";
import sliderModel from "../models/Slider";

export const createSlider = async (payload) => {
  const slider = new sliderModel(payload);
  const sliderData = await slider.save();
  console.log(sliderData);
  return { status: "success", message: "Successfully created" };
};

export const getSliders = async (page, userId) => {
  const sliders = await sliderModel
    .find({ author: userId })
    .select("id name key createdAt status")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await sliderModel.countDocuments({ author: userId });

  return {
    status: "success",
    data: {
      sliders,
      count,
      currentPage: page + 1,
    },
  };
};

export const getAllPublishedSliders = async (userId) => {
  const sliders = await sliderModel
    .find({ author: userId, status: "Published" })
    .select("id name");

  return {
    status: "success",
    data: sliders,
  };
};

export const getSliderDetails = async (id, userId) => {
  const slider = await sliderModel
    .findOne({ id: id, author: userId })
    .select("-author");

  return {
    status: "success",
    data: slider,
  };
};

export const updateSlider = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const slider = await sliderModel.updateOne(
    { id: id, author: userId },
    { ...payload },
    { runValidators: true }
  );
  if (slider.n > 0)
    return {
      status: "success",
      message: "Slider Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid SliderId",
    };
};

export const deleteSlider = async (id, userId) => {
  const slider = await sliderModel.deleteOne({ id: id, author: userId });
  console.log(slider);
  if (slider.n > 0)
    return {
      status: "success",
      message: "Slider Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid SliderId",
    };
};

export const createSliderItem = async (id, payload) => {
  const slider = await sliderModel.updateOne(
    { id: id },
    { $push: { sliderItems: { ...payload, createdAt: new Date() } } },
    { runValidators: true }
  );
  console.log(slider);
  if (slider.nModified > 0)
    return {
      status: "success",
      message: "Slider Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid SliderId",
    };
};

export const deleteSliderItem = async (id, itemId) => {
  const slider = await sliderModel.updateOne(
    { id: id },
    { $pull: { sliderItems: { _id: itemId } } }
  );
  console.log(slider);
  if (slider.nModified > 0)
    return {
      status: "success",
      message: "Slider Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid SliderId",
    };
};

export const updateSliderItem = async (id, itemId, payload) => {
  let query = {};
  for (var key in payload) {
    query[`sliderItems.$.` + key] = payload[key];
  }
  console.log(query);
  const slider = await sliderModel.updateOne(
    { id: id, "sliderItems._id": itemId },
    {
      $set: query,
    },
    { runValidators: true }
  );
  console.log(slider);
  if (slider.nModified > 0)
    return {
      status: "success",
      message: "Slider Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid SliderId",
    };
};
