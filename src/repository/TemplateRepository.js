import { PAGE_LIMIT } from "../config/constants";
import templateModel from "../models/Template";

export const createTemplate = async (payload) => {
  const template = new templateModel(payload);
  const templateData = await template.save();
  console.log(templateData);
  return { status: "success", message: "Successfully created" };
};

export const getTemplates = async (page) => {
  const templates = await templateModel.find().select("name");
  // .limit(PAGE_LIMIT)
  // .skip(PAGE_LIMIT * page);

  return {
    status: "success",
    data: templates,
  };
};

// export const getPageDetails = async (id) => {
//   const page = await pageModel.findOne({ id: id, softDelete: false });

//   return {
//     status: "success",
//     data: page,
//   };
// };

export const updateTemplate = async (id, payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const template = await templateModel.updateOne(
    { _id: id },
    { ...payload },
    { runValidators: true }
  );
  if (template.n > 0)
    return {
      status: "success",
      message: "Template Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid Template Id",
    };
};

export const deleteTemplate = async (id) => {
  const template = await templateModel.deleteOne({ _id: id });
  console.log(template);
  if (template.n > 0)
    return {
      status: "success",
      message: "Template Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid TemplateId",
    };
};
