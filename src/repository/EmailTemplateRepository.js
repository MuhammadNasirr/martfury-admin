import { PAGE_LIMIT } from "../config/constants";
import EmailTemplate from "../models/EmailTemplate";

export const createEmailTemplate = async (payload) => {
  const emailTemplate = new EmailTemplate(payload);
  const emailTemplateData = await emailTemplate.save();
  console.log(emailTemplateData);
  return { status: "success", message: "Successfully created" };
};

export const getEmailTemplates = async () => {
  const emailTemplates = await EmailTemplate.find();

  return {
    status: "success",
    data: emailTemplates,
  };
};

export const updateEmailBody = async (id, payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const cat = await EmailTemplate.updateOne(
    { _id: id },
    { ...payload },
    { runValidators: true }
  );
  if (cat.n > 0)
    return {
      status: "success",
      message: "Template Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Invalid TemplateId",
    };
};

export const enableEmailTemplate = async (id, enabled) => {
  const cat = await EmailTemplate.updateOne({ _id: id }, { enabled });
  console.log(cat);
  if (cat.n > 0)
    return {
      status: "success",
      message: "Email Template Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid Email Template ID",
    };
};
