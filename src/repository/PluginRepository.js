import { PAGE_LIMIT } from "../config/constants";
import pluginModel from "../models/Plugins";

export const createPlugin = async (payload) => {
  const plugin = new pluginModel(payload);
  const pluginData = await plugin.save();
  console.log(pluginData);
  return { status: "success", message: "Successfully created" };
};

export const getPlugins = async () => {
  const plugins = await pluginModel
    .find({ softDelete: false })
    .select("name activated description version")
    .populate({
      path: "author",
      select: { name: 1 },
    });

  //   const count = await pluginModel.countDocuments({ softDelete: false });

  return {
    status: "success",
    data: plugins,
  };
};

export const updatePlugin = async (id, activated) => {
  const plugin = await pluginModel.updateOne(
    { _id: id },
    { activated },
    { runValidators: true }
  );
  if (plugin.n > 0)
    return {
      status: "success",
      message: "Plugin Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Inavlid PluginId",
    };
};

export const deletePlugin = async (id) => {
  const ad = await pluginModel.updateOne(
    { _id: id },
    { softDelete: true },
    { runValidators: true }
  );
  console.log(ad);
  if (ad.n > 0)
    return {
      status: "success",
      message: "Plugin Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid PluginId",
    };
};
