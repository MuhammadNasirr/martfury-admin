import { PAGE_LIMIT } from "../config/constants";
import catModel from "../models/ProductCategory";

export const createCat = async (payload) => {
  const cat = new catModel(payload);
  const catData = await cat.save();
  console.log(catData);
  return { status: "success", message: "Successfully created" };
};

export const getCats = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const cats = await catModel
    .find({ ...query })
    .select("id name status createdAt ")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await catModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      cats,
      count,
      currentPage: page + 1,
    },
  };
};

export const getPublishedCategory = async (page, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const cats = await catModel
    .find({ ...query, status: "Published" })
    .select("id name image order")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page)
    .sort("order");

  const count = await catModel.countDocuments({
    ...query,
    status: "Published",
  });

  return {
    status: "success",
    data: {
      cats,
      count,
      currentPage: page + 1,
    },
  };
};

export const getPublishedCategoryPublic = async (query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const cats = await catModel
    .find({ ...query, status: "Published" })
    .sort("order");
  let catObj = {};
  let parentArray = [];
  for (let i = 0; i < cats.length; i++) {
    let cat = cats[i].toJSON();
    if (cat.parent === null) {
      parentArray.push(cat);
      continue;
    }
    if (catObj[cat.parent]) catObj[cat.parent].push(cat);
    else catObj[cat.parent] = [cat];
  }
  for (let i = 0; i < parentArray.length; i++) {
    if (catObj[parentArray[i]._id]) {
      parentArray[i].mega = true;
      // console.log();
      parentArray[i].megaContent = catObj[parentArray[i]._id];
    } else {
      parentArray[i].mega = false;

      parentArray[i].megaContent = [];
    }
  }

  return {
    status: "success",
    data: {
      cats: parentArray,
    },
  };
};

export const getAllPublishedCats = async (userId) => {
  const cats = await catModel.find({ status: "Published" }).select("id name");

  return {
    status: "success",
    data: cats,
  };
};

export const getCatDetails = async (id, userId) => {
  const cat = await catModel
    .findOne({ id: id })
    .populate({
      path: "parent",
      select: { name: 1 },
    })
    .select("-author");

  return {
    status: "success",
    data: cat,
  };
};

export const updateCat = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const cat = await catModel.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (cat.n > 0)
    return {
      status: "success",
      message: "Category Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid CategoryId",
    };
};

export const deleteCat = async (id, userId) => {
  const cat = await catModel.deleteOne({ id: id });
  console.log(cat);
  if (cat.n > 0)
    return {
      status: "success",
      message: "Category Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid categoryId",
    };
};
