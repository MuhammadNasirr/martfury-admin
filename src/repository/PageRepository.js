import { PAGE_LIMIT } from "../config/constants";
import pageModel from "../models/Page";

export const createPage = async (payload) => {
  const page = new pageModel(payload);
  const pageData = await page.save();
  console.log(pageData);
  return { status: "success", message: "Successfully created" };
};

export const getPages = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const pages = await pageModel
    .find({ softDelete: false, ...query })
    .select("id name template status createdAt")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await pageModel.countDocuments({
    softDelete: false,

    ...query,
  });

  return {
    status: "success",
    data: {
      pages,
      count,
      currentPage: page + 1,
    },
  };
};

export const getPageDetails = async (id, userId) => {
  const page = await pageModel
    .findOne({ id: id, softDelete: false })
    .populate({
      path: "template",
      select: { name: 1 },
    })
    .select("-author");

  return {
    status: "success",
    data: page,
  };
};

export const updatePage = async (id, payload, userId) => {
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

export const deletePage = async (id, userId) => {
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

export const getMenuPages = async (userId) => {
  const pages = await pageModel
    .find({ softDelete: false, status: "Published" })
    .select("id name");
  const menuPage = [];
  if (pages.length) {
    pages.forEach((page) => {
      menuPage.push({
        text: page.name,
        url: `/${page.name.replace(" ", "-")}`,
      });
    });
  }
  menuPage.push({
    name: "Blogs",
    url: "/blogs",
  });
  return {
    status: "success",
    subMenus: menuPage,
  };
};

export const getPageByName = async (name) => {
  const menu = await pageModel
    .find({ name: name, status: "Published" })
    .select("content template")
    .populate({
      path: "template",
      select: { header: 1, footer: 1 },
    });

  return {
    status: "success",
    data: menu,
  };
};
