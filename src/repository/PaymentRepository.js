import { PAGE_LIMIT } from "../config/constants";
import paymentModel from "../models/PaymentMethods";

export const createPayment = async (payload) => {
  const payment = new paymentModel(payload);
  const paymentData = await payment.save();
  console.log(paymentData);
  return { status: "success", message: "Successfully created" };
};

export const getAllPayments = async () => {
  //   if (query.name) {
  //     query.name = { $regex: query.name, $options: "i" };
  //   }
  const paymentMethods = await paymentModel.find();

  return {
    status: "success",
    data: paymentMethods,
  };
};

export const getAllActivatedPayments = async () => {
  const paymentMethods = await paymentModel.find({ isActivated: true });

  return {
    status: "success",
    data: paymentMethods,
  };
};

export const getPayment = async (id) => {
  const paymentMethods = await paymentModel.findOne({
    isActivated: true,
    _id: id,
  });

  return {
    status: "success",
    data: paymentMethods,
  };
};

export const updatePayment = async (id, payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const brand = await paymentModel.updateOne(
    { _id: id },
    { ...payload },
    { runValidators: true }
  );
  if (brand.n > 0)
    return {
      status: "success",
      message: "Payment Method Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid Payment ID",
    };
};

export const setDefaultPayment = async (id) => {
  const payment = await paymentModel.updateMany(
    {},
    { isDefault: false },
    { runValidators: true }
  );
  const defaultPayment = await paymentModel.updateOne(
    { _id: id },
    { isDefault: true },
    { runValidators: true }
  );
  return {
    status: "success",
    message: "Payment Method Successfully updated",
  };
};
// export const deleteBrand = async (id, userId) => {
//   const brand = await paymentModel.deleteOne({ _id: id, author: userId });
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
