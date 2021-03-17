import { PAGE_LIMIT } from "../config/constants";
import emailProviderModel from "../models/EmailProvider";

export const createEmailProvider = async (payload) => {
  const emailProvider = new emailProviderModel(payload);
  const emailProviderData = await emailProvider.save();
  console.log(emailProviderData);
  return { status: "success", message: "Successfully created" };
};

export const getEmailProviders = async () => {
  //   if (query.name) {
  //     query.name = { $regex: query.name, $options: "i" };
  //   }
  const emailProviders = await emailProviderModel.find();

  return {
    status: "success",
    data: emailProviders,
  };
};

export const getDefaultEmailProviders = async () => {
  //   if (query.name) {
  //     query.name = { $regex: query.name, $options: "i" };
  //   }
  const emailProviders = await emailProviderModel.find({ isDefault: true });

  return {
    status: "success",
    data: emailProviders,
  };
};

export const updateEmailProvider = async (id, payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const brand = await emailProviderModel.updateOne(
    { _id: id },
    { ...payload },
    { runValidators: true }
  );
  if (brand.n > 0)
    return {
      status: "success",
      message: "Email Provider Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Invalid Email Provider ID",
    };
};

export const setDefaultEmailProvider = async (id) => {
  const payment = await emailProviderModel.updateMany(
    {},
    { isDefault: false },
    { runValidators: true }
  );
  const defaultPayment = await emailProviderModel.updateOne(
    { _id: id },
    { isDefault: true },
    { runValidators: true }
  );
  return {
    status: "success",
    message: "Email Provider Successfully updated",
  };
};
// export const deleteBrand = async (id, userId) => {
//   const brand = await emailProviderModel.deleteOne({ _id: id, author: userId });
//   console.log(brand);
//   if (brand.n > 0)
//     return {
//       status: "success",
//       message: "Brand Successfully deleted",
//     };
//   else
//     return {
//       status: "fail",
//       message: "Inavlid BrandId",
//     };
// };
