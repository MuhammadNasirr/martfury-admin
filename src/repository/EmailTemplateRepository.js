import fetch from "node-fetch";
import { PAGE_LIMIT } from "../config/constants";
import Email from "../models/Email";
import EmailProvider from "../models/EmailProvider";
import EmailTemplates from "../models/EmailTemplates";
import EmailTemplate from "../models/EmailTemplates";

export const createEmailTemplate = async (payload) => {
  const emailTemplate = new EmailTemplate(payload);
  const emailTemplateData = await emailTemplate.save();
  console.log(emailTemplateData);
  return { status: "success", message: "Successfully created" };
};

export const getEmailTemplates = async () => {
  const emailTemplates = await EmailTemplate.aggregate([
    {
      $group: {
        _id: "$category",
        templates: {
          $push: {
            _id: "$_id",
            template: "$template",
            description: "$description",
            enabled: "$enabled",
          },
        },
      },
    },
  ]);

  return {
    status: "success",
    data: emailTemplates,
  };
};

export const getEmailTemplateById = async (id) => {
  const emailTemplates = await EmailTemplate.findOne({ _id: id });

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

export const sendMail = async (templateId, to) => {
  const emailProvider = await EmailProvider.findOne({ isDefault: true });
  const provider = emailProvider;

  const emailTemplate = await EmailTemplates.findOne({ _id: templateId });
  const template = emailTemplate;

  const emailSetting = await Email.findOne();
  const email = emailSetting;
  console.log({ provider, template, email });

  try {
    console.log(
      `${provider.endpoint}?apikey=${provider.key}&subject=${template.subject}&to=${to}&from=hameez21@live.com&bodyHtml=${template.body}`
    );
    let res = await fetch(
      `${provider.endpoint}?apikey=${provider.key}&subject=${template.subject}&to=${to}&from=syed_hameez21@outlook.com&bodyHtml=${template.body}`,
      {
        method: "POST",
      }
    );

    if (res.ok) {
      res = await res.json();
      console.log(res);

      if (res.success) {
        return { status: "success" };
      }
      return { status: "error", message: res.error };
    } else throw res;
  } catch (error) {
    if (error.json) console.log(await error.json());
    else console.log(await error);

    return { status: "error" };
  }
};
