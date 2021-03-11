import { PAGE_LIMIT } from "../config/constants";
import langModel from "../models/Language";

export const createLang = async (payload) => {
  const lang = new langModel(payload);
  const langData = await lang.save();
  console.log(langData);
  return { status: "success", message: "Successfully created" };
};

export const getLang = async () => {
  const langs = await langModel.find();

  return {
    status: "success",
    data: langs,
  };
};

// export const updateAd = async (id, payload, userId) => {
//   if (payload.id) {
//     delete payload.id;
//   }
//   if (payload._id) {
//     delete payload._id;
//   }
//   const Ad = await langModel.updateOne(
//     { id: id, author: userId },
//     { ...payload },
//     { runValidators: true }
//   );
//   if (Ad.n > 0)
//     return {
//       status: "success",
//       message: "Advertisement Successfully updated",
//     };
//   else
//     return {
//       status: "fail",
//       message: "Inavlid AdvertisementId",
//     };
// };

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
