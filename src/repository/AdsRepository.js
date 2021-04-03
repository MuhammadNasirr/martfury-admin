import { PAGE_LIMIT } from "../config/constants";
import adsModel from "../models/Ads";

export const createAd = async (payload) => {
  const ad = new adsModel(payload);
  const adData = await ad.save();
  console.log(adData);
  return { status: "success", message: "Successfully created" };
};

export const getAds = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const ads = await adsModel
    .find({ ...query })
    .select("id name status expiredAt image clicked shortCode ")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await adsModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      ads,
      count,
      currentPage: page + 1,
    },
  };
};

export const getAllPublishedAds = async (userId) => {
  const ads = await adsModel.find({ status: "Published" }).select("id name");

  return {
    status: "success",
    data: ads,
  };
};

export const getAdDetails = async (id, userId) => {
  const ad = await adsModel.findOne({ id: id }).select("-author");

  return {
    status: "success",
    data: ad,
  };
};

export const updateAd = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const Ad = await adsModel.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (Ad.n > 0)
    return {
      status: "success",
      message: "Advertisement Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid AdvertisementId",
    };
};

export const deleteAd = async (id, userId) => {
  const ad = await adsModel.deleteOne({ id: id });
  console.log(ad);
  if (ad.n > 0)
    return {
      status: "success",
      message: "Advertisement Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid AdvertisementId",
    };
};
