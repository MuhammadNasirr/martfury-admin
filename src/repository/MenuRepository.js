import { PAGE_LIMIT } from "../config/constants";
import menuModel from "../models/Menu";

export const createMenu = async (payload) => {
  const menu = new menuModel(payload);
  const menuData = await menu.save();
  console.log(menuData);
  return { status: "success", message: "Successfully created" };
};

export const getMenus = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const menus = await menuModel
    .find({ ...query })
    .select("id name status createdAt")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await menuModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      menus,
      count,
      currentPage: page + 1,
    },
  };
};

export const getMenuDetails = async (id, userId) => {
  const menu = await menuModel.findOne({ id: id }).select("-author");

  return {
    status: "success",
    data: menu,
  };
};

export const getMenuByDisplayLocation = async (type) => {
  const menu = await menuModel
    .find({ displayLocation: type, status: "Published" })
    .select("structure");

  return {
    status: "success",
    data: menu,
  };
};

export const updateMenu = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const menu = await menuModel.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (menu.n > 0)
    return {
      status: "success",
      message: "menu Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid menuId",
    };
};

export const deleteMenu = async (id, userId) => {
  const menu = await menuModel.deleteOne({ id: id });
  console.log(menu);
  if (menu.n > 0)
    return {
      status: "success",
      message: "menu Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid menuId",
    };
};
