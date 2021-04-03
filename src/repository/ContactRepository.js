import { PAGE_LIMIT } from "../config/constants";
import contactModel from "../models/Contact";

export const createContact = async (payload) => {
  const tag = new contactModel(payload);
  const tagData = await tag.save();
  console.log(tagData);
  return { status: "success", message: "Successfully created" };
};

export const getContacts = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const contacts = await contactModel
    .find({ ...query })
    .select("id name email phone status createdAt")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await contactModel.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      contacts,
      count,
      currentPage: page + 1,
    },
  };
};

// export const getPublishedTags = async (userId) => {
//   const tags = await contactModel
//     .find({ , status: "Published" })
//     .select("id name ");

//   return {
//     status: "success",
//     data: tags,
//   };
// };

export const getContactDetails = async (id, userId) => {
  const contact = await contactModel.findOne({ id: id }).select("-author");

  return {
    status: "success",
    data: contact,
  };
};

export const updateContact = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  if (payload.replies) {
    delete payload.replies;
  }
  const contact = await contactModel.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (contact.n > 0)
    return {
      status: "success",
      message: "Contact Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid ContactId",
    };
};

export const addReply = async (id, payload, userId) => {
  const contact = await contactModel.updateOne(
    { id: id },
    { $push: { replies: payload } },
    { runValidators: true }
  );
  if (contact.n > 0) {
    const replies = await contactModel.findOne({ id: id }).select("replies");
    return {
      status: "success",
      message: "Reply Saved",
      replies: replies.replies,
    };
  } else
    return {
      status: "fail",
      message: "Inavlid ContactId",
    };
};

export const deleteContact = async (id, userId) => {
  const contact = await contactModel.deleteOne({ id: id });
  console.log(contact);
  if (contact.n > 0)
    return {
      status: "success",
      message: "Contact Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid ContactId",
    };
};
