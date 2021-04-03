import { PAGE_LIMIT } from "../config/constants";
import brandModel from "../models/Brand";

export const createBrand = async (payload) => {
  const brand = new brandModel(payload);
  const brandData = await brand.save();
  console.log(brandData);
  return { status: "success", message: "Successfully created" };
};

export const getBrands = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const brands = await brandModel
    .find({ ...query })
    .select("id name status createdAt ")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await brandModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      brands,
      count,
      currentPage: page + 1,
    },
  };
};

export const getAllPublishedBrands = async (userId) => {
  const brands = await brandModel
    .find({ status: "Published" })
    .select("id name");

  return {
    status: "success",
    data: brands,
  };
};

export const getBrandDetails = async (id, userId) => {
  const brand = await brandModel
    .findOne({ id: id })
    .populate({
      path: "parent",
      select: { name: 1 },
    })
    .select("-author");

  return {
    status: "success",
    data: brand,
  };
};

export const updateBrand = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const brand = await brandModel.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (brand.n > 0)
    return {
      status: "success",
      message: "Brand Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid BrandId",
    };
};

export const deleteBrand = async (id, userId) => {
  const brand = await brandModel.deleteOne({ id: id });
  console.log(brand);
  if (brand.n > 0)
    return {
      status: "success",
      message: "Brand Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid BrandId",
    };
};
