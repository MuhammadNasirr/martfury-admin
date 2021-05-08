import { PAGE_LIMIT } from "../config/constants";
import Model from "../models/Product";
import Review from "../models/Review";

const modelName = "Product";

export const create = async (payload) => {
  const model = new Model(payload);
  const modelData = await model.save();
  console.log(modelData);
  return { status: "success", message: "Successfully created" };
};

export const get = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const products = await Model.find({ ...query })
    .select(
      "id name images price salePrice quanitity inStore sku status createdAt"
    )
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await Model.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      products,
      count,
      currentPage: page + 1,
    },
  };
};

export const getPublishedProducts = async (page, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  if (query.discountDate) {
    query.discountDate = JSON.parse(query.discountDate);
    query.discountDate = {
      from: new Date(query.discountDate.from),
      to: new Date(query.discountDate.to),
    };
  }
  console.log(query.discountDate);
  const products = await Model.find({ ...query, status: "Published" })
    .select("id name images price salePrice isFeatured categories")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  let pro = JSON.parse(JSON.stringify(products));
  console.log(pro);

  // products = products.toJSON();
  for (let i = 0; i < products.length; i++) {
    const reviews = await Review.countDocuments({ product: products[i]._id });

    // product.reviewCount = reviews;
    const avgRating = await Review.aggregate([
      {
        $match: { product: products[i]._id },
      },
      {
        $group: { _id: products[i]._id, average: { $avg: "$stars" } },
      },
    ]);
    pro[i].reviewCount = reviews;
    pro[i].averageRating = avgRating.length ? avgRating[0].average : 0;
  }
  const count = await Model.countDocuments({ ...query, status: "Published" });

  return {
    status: "success",
    data: {
      products: pro,
      count,
      currentPage: page + 1,
    },
  };
};

export const getAllPublished = async (query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const product = await Model.find({ status: "Published", ...query })
    .populate({ path: "categories" })
    .populate({ path: "brand" })
    .populate({ path: "productCollection" })
    .populate({ path: "tax" })
    .populate("attributes.attributeId")
    .populate("tags.tagId");

  return {
    status: "success",
    data: product,
  };
};

export const getDetails = async (id, userId) => {
  const product = await Model.findOne({ id: id })
    .populate({ path: "categories" })
    .populate({ path: "brand" })
    .populate({ path: "productCollection" })
    .populate({ path: "tax" })
    .populate("attributes.attributeId")
    .populate("tags.tagId");
  if (product) {
    const variation = await Model.find({ name: product.name })
      .populate({ path: "categories" })
      .populate({ path: "brand" })
      .populate({ path: "productCollection" })
      .populate({ path: "tax" })
      .populate("attributes.attributeId")
      .populate("tags.tagId");
    return {
      status: "success",
      data: {
        product,
        variation,
      },
    };
  }
  return {
    status: "success",
    data: [],
  };
};

export const update = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const collection = await Model.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (collection.n > 0)
    return {
      status: "success",
      message: modelName + " Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Invalid " + modelName + "Id",
    };
};

export const deleteModel = async (id) => {
  const collection = await Model.deleteOne({ id: id });
  console.log(collection);
  if (collection.n > 0)
    return {
      status: "success",
      message: modelName + " Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Invalid " + modelName + "Id",
    };
};
