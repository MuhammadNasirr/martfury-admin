import { PAGE_LIMIT } from "../config/constants";
import Email from "../models/Email";
import EmailProvider from "../models/EmailProvider";
import EmailTemplates from "../models/EmailTemplates";
import settingsModel from "../models/Settings";
import { getEmailTemplates } from "./EmailTemplateRepository";

export const createSettings = async (payload) => {
  const settings = new settingsModel({
    general: payload.general,
    adminAppearance: payload.adminAppearance,
  });
  const email = new Email({ ...payload.email });
  const settingsData = await settings.save();
  const emailData = await email.save();
  console.log(settingsData);
  return { status: "success", message: "Successfully created" };
};

export const getSettings = async () => {
  const settings = await (
    await settingsModel.findOne().select("-author -_id -id -__v")
  ).toJSON();
  const emailProvider = await EmailProvider.find();
  const emailSettings = await Email.findOne().select("-_id  -__v");
  const emailTemplates = await getEmailTemplates();

  return {
    status: "success",
    data: {
      ...settings,
      email: {
        emailProvider,
        emailTemplates: emailTemplates.data,
        emailSettings,
      },
    },
  };
};

export const updateEmail = async (payload) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }

  const email = await Email.updateOne(
    {},
    { ...payload },
    { runValidators: true }
  );
  if (email.n > 0)
    return {
      status: "success",
      message: "Settings Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Failed to update or no chaange",
    };
};

export const updateSetting = async (payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const Ad = await settingsModel.updateOne(
    {},
    { ...payload },
    { runValidators: true }
  );
  if (Ad.n > 0)
    return {
      status: "success",
      message: "Settings Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Failed to update or no chaange",
    };
};

// export const updateEmail = async (payload) => {
//   if (payload.id) {
//     delete payload.id;
//   }
//   if (payload._id) {
//     delete payload._id;
//   }
//   const Ad = await Email.updateOne({}, { ...payload }, { runValidators: true });
//   if (Ad.n > 0)
//     return {
//       status: "success",
//       message: "Settings Successfully updated",
//     };
//   else
//     return {
//       status: "fail",
//       message: "Failed to update or no chaange",
//     };
// };
