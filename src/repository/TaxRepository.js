import { PAGE_LIMIT } from "../config/constants";
import taxModel from "../models/Tax";

export const createTax = async (payload) => {
  const tax = new taxModel(payload);
  const taxData = await tax.save();
  console.log(taxData);
  return { status: "success", message: "Successfully created" };
};

export const getTaxes = async (page, userId, query) => {
  if (query.title) {
    query.title = { $regex: query.title, $options: "i" };
  }
  const taxes = await taxModel
    .find({ ...query })
    .select("id title taxPercent priority status createdAt ")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await taxModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      taxes,
      count,
      currentPage: page + 1,
    },
  };
};

export const getAllPublishedTaxes = async (userId) => {
  const taxes = await taxModel.find({ status: "Published" }).select("id title");

  return {
    status: "success",
    data: taxes,
  };
};

export const getTaxDetails = async (id, userId) => {
  const tax = await taxModel.findOne({ id: id }).select("-author");

  return {
    status: "success",
    data: tax,
  };
};

export const updateTax = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const tax = await taxModel.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (tax.n > 0)
    return {
      status: "success",
      message: "Tax Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid TaxId",
    };
};

export const deleteTax = async (id) => {
  const tax = await taxModel.deleteOne({ id: id });
  console.log(tax);
  if (tax.n > 0)
    return {
      status: "success",
      message: "Tax Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid TaxId",
    };
};
