import { PAGE_LIMIT } from "../config/constants";
import sliderModel from "../models/Slider";
import SliderItemsModel from "../models/SliderItems";

export const createSlider = async (payload) => {
  console.log("SLIDER", payload);
  const slider = new sliderModel(payload);

  const sliderData = await slider.save();
  console.log(sliderData);
  return { status: "success", message: "Successfully created" };
};

export const getSliders = async (page, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const sliders = await sliderModel
    .find({ ...query })
    .select("id name key createdAt status")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await sliderModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      sliders,
      count,
      currentPage: page + 1,
    },
  };
};

export const getAllSliders = async (page, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const sliders = await sliderModel
    .find({ status: "Published", ...query })
    .populate({
      path: "sliderItems",
    })
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await sliderModel.countDocuments({ ...query });

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
    .findOne({ id: id })
    .select("-author")
    .populate({
      path: "sliderItems",
    });

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
    { id: id },
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
  const slider = await sliderModel.deleteOne({ id: id });
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
  const sliderItem = await SliderItemsModel({
    ...payload,
    createdAt: new Date(),
  });

  console.log("sliderItemModel", sliderItem);

  const slider = await sliderModel.updateOne(
    { id: id },
    { $push: { sliderItems: { _id: sliderItem._id } } },
    { runValidators: true }
  );
  await sliderItem.save();
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
  const sliderItem = await SliderItemsModel.findOne({ id: itemId });
  await SliderItemsModel.deleteOne({ id: itemId });
  const slider = await sliderModel.updateOne(
    { id: id },
    { $pull: { sliderItems: { _id: sliderItem._id } } }
  );
  console.log(slider);
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

export const updateSliderItem = async (id, itemId, payload) => {
  const slider = await SliderItemsModel.updateOne(
    { id: itemId },
    {
      ...payload,
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
