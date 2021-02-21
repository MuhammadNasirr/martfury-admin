import { PAGE_LIMIT } from "../config/constants";
import faqModel from "../models/FAQ";

export const createFaq = async (payload) => {
  const cat = new faqModel(payload);
  const catData = await cat.save();
  console.log(catData);
  return { status: "success", message: "Successfully created" };
};

export const getFaqs = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const cats = await faqModel
<<<<<<< HEAD
    .find({ author: userId, ...query })
    .select("id name categories createdAt status")
=======
    .find({ author: userId })
    .select("id question categories createdAt status")
>>>>>>> 286d396f11e91ac720c3bb3d40d6b3a83267f77b
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page)
    .populate({
      path: "categories",
      select: { name: 1 },
    });

  const count = await faqModel.countDocuments({ author: userId, ...query });

  return {
    status: "success",
    data: {
      Faqs: cats,
      count,
      currentPage: page + 1,
    },
  };
};

export const getFaqDetails = async (id, userId) => {
  const cat = await faqModel.findOne({ id: id, author: userId });
  // .populate({
  //   path: "categories",
  //   select: { name: 1, id: 1 },
  // })
  // .populate({
  //   path: "tags",
  //   select: { name: 1, id: 1 },
  // })
  // .populate({
  //   path: "author",
  //   select: { name: 1 },
  // });

  return {
    status: "success",
    data: cat,
  };
};

export const updateFaq = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const cat = await faqModel.updateOne(
    { id: id, author: userId },
    { ...payload },
    { runValidators: true }
  );
  if (cat.n > 0)
    return {
      status: "success",
      message: "FAQ Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid FAQId",
    };
};

export const deleteFaq = async (id, userId) => {
  const cat = await faqModel.deleteOne({ id: id, author: userId });
  console.log(cat);
  if (cat.n > 0)
    return {
      status: "success",
      message: "FAQ Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid FAQId",
    };
};
