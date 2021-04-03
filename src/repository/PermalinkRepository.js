import { PAGE_LIMIT } from "../config/constants";
import Model from "../models/Permalink";
import Settings from "../models/Settings";

const modelName = "Permalink";

export const create = async (payload) => {
  const model = new Model(payload);
  const modelData = await model.save();
  console.log(modelData);
  return { status: "success", message: "Successfully created" };
};

export const get = async (query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const permalinkC = await Model.find();

  let settings = await (await Settings.findOne().select("general")).toJSON();
  let permalink = [];
  permalinkC.forEach((per) => {
    let c = per.toJSON();
    c.preview = (settings.siteAddress ? settings.siteAddress : "") + c.link;
    permalink.push(c);
  });
  return {
    status: "success",
    data: {
      permalink,
    },
  };
};

export const update = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  const permalink = await Model.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (permalink.n > 0)
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
