import { PAGE_LIMIT } from "../config/constants";
import attrModel from "../models/ProductAttributes";

export const createAttr = async (payload) => {
  const attr = new attrModel(payload);
  const attrData = await attr.save();
  console.log(attrData);
  return { status: "success", message: "Successfully created" };
};

export const getAttrs = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const attrs = await attrModel
    .find({ ...query })
    .select("id title slug createdAt status order")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await attrModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      attributes: attrs,
      count,
      currentPage: page + 1,
    },
  };
};

export const getAllPublishedAttrs = async (userId) => {
  const attrs = await attrModel
    .find({ status: "Published" })
    .select("id title attributesList.title");

  return {
    status: "success",
    data: attrs,
  };
};

export const getAttrDetails = async (id, userId) => {
  const attr = await attrModel
    .findOne({ id: id })

    .select("-author");

  return {
    status: "success",
    data: attr,
  };
};

export const updateAttr = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const attr = await attrModel.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (attr.n > 0)
    return {
      status: "success",
      message: "Product Attribute Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid Product Attribute Id",
    };
};

export const deleteAttr = async (id, userId) => {
  const atr = await attrModel.deleteOne({ id: id });
  console.log(atr);
  if (atr.n > 0)
    return {
      status: "success",
      message: "Product Attribute Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid Product Attribute ID",
    };
};
