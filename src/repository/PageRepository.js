import { PAGE_LIMIT } from "../config/constants";
import pageModel from "../models/Page";

export const createPage = async (payload) => {
  const page = new pageModel(payload);
  const pageData = await page.save();
  console.log(pageData);
  return { status: "success", message: "Successfully created" };
};

export const getPages = async (page) => {
  const pages = await pageModel
    .find({ softDelete: false })
    .select("id name template status createdAt")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await pageModel.countDocuments();

  return {
    status: "success",
    data: {
      pages,
      count,
      currentPage: page + 1,
    },
  };
};

export const getPageDetails = async (id) => {
  const page = await pageModel.findOne({ id: id, softDelete: false });

  return {
    status: "success",
    data: page,
  };
};

export const updatePage = async (id, payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const page = await pageModel.updateOne(
    { id: id, softDelete: false },
    { ...payload },
    { runValidators: true }
  );
  if (page.n > 0)
    return {
      status: "success",
      message: "Page Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid PageId",
    };
};

export const deletePage = async (id) => {
  const page = await pageModel.updateOne(
    { id: id, softDelete: false },
    { softDelete: true },
    { runValidators: true }
  );
  if (page.n > 0)
    return {
      status: "success",
      message: "Page Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid PageId",
    };
};
