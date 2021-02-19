import { PAGE_LIMIT } from "../config/constants";
import newsletterModel from "../models/Newsletter";

export const createNewsletter = async (payload) => {
  const newsletter = new newsletterModel(payload);
  const newsletterData = await newsletter.save();
  console.log(newsletterData);
  return { status: "success", message: "Successfully created" };
};

export const getNewsletters = async (page) => {
  const newsletters = await newsletterModel
    .find()
    .select("id name status createdAt email")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await newsletterModel.countDocuments();

  return {
    status: "success",
    data: {
      newsletters,
      count,
      currentPage: page + 1,
    },
  };
};

export const deleteNewletter = async (id) => {
  const newletter = await newsletterModel.deleteOne({ id: id });
  console.log(newletter);
  if (newletter.n > 0)
    return {
      status: "success",
      message: "Newsletter Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid NewsletterId",
    };
};
