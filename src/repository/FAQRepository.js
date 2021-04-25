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
    .find({ ...query })
    .select("id question categories createdAt status")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page)
    .populate({
      path: "categories",
      select: { name: 1 },
    });

  const count = await faqModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      Faqs: cats,
      count,
      currentPage: page + 1,
    },
  };
};

export const getFaqsWithAnswer = async () => {
  const cats = await faqModel
    .find({ status: "Published" })
    .select("id question categories answer")
    .populate({
      path: "categories",
      select: { name: 1 },
    });

  let data = [];

  cats.forEach((cat) => {
    let index = data.findIndex((a) => a?.categoryId === cat.categories?._id);
    if (index > -1) {
      data[index].faqs.push({
        id: cat.id,
        question: cat.question,
        answer: cat.answer,
      });
    } else {
      data.push({
        categoryId: cat.categories?._id,
        categoryName: cat.categories?.name,
        faqs: [
          {
            id: cat.id,
            question: cat.question,
            answer: cat.answer,
          },
        ],
      });
    }
  });

  return {
    status: "success",
    data: data,
  };
};

export const getFaqDetails = async (id, userId) => {
  const cat = await faqModel.findOne({ id: id });
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
    { id: id },
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
  const cat = await faqModel.deleteOne({ id: id });
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
