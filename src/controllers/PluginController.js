import * as pluginRepo from "../repository/PluginRepository";

export const createPlugin = async (req, res, next) => {
  const { name } = req.body;
  let payload = {
    name,
    author: req.jwtPayload.userid,
  };
  try {
    let respo = await pluginRepo.createPlugin(payload);
    if (respo.status === "success") {
      res.status(200).json(respo);
    } else {
      const err = new Error(respo.message);
      err.status = respo.status;
      err.statusCode = 400;
      next(err);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getPlugins = async (req, res, next) => {
  //   console.log(req);

  try {
    console.log(req.jwtPayload);
    let respo = await pluginRepo.getPlugins();
    if (respo.status === "success") {
      if (respo.data.length) res.status(200).json(respo);
      else {
        res.status(204).json(respo);
      }
    } else {
      const err = new Error(respo.message);
      err.status = respo.status;
      err.statusCode = 400;
      next(err);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const activatePlugin = async (req, res, next) => {
  //   console.log(req);
  const { pluginId } = req.params;
  const payload = { ...req.body };
  let id = pluginId;
  if (!id) {
    const err = new Error("Invalid PluginId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await pluginRepo.updatePlugin(id, true, req.jwtPayload.userid);
    if (respo.status === "success") {
      res.status(200).json(respo);
    } else {
      const err = new Error(respo.message);
      err.status = respo.status;
      err.statusCode = 400;
      next(err);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deactivatePlugin = async (req, res, next) => {
  //   console.log(req);
  const { pluginId } = req.params;
  const payload = { ...req.body };
  let id = pluginId;
  if (!id) {
    const err = new Error("Invalid PluginId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await pluginRepo.updatePlugin(id, false, req.jwtPayload.userid);
    if (respo.status === "success") {
      res.status(200).json(respo);
    } else {
      const err = new Error(respo.message);
      err.status = respo.status;
      err.statusCode = 400;
      next(err);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deletePlugin = async (req, res, next) => {
  //   console.log(req);
  const { pluginId } = req.params;

  let id = pluginId;
  if (!id) {
    const err = new Error("Invalid PluginId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await pluginRepo.deletePlugin(id);
    if (respo.status === "success") {
      res.status(200).json(respo);
    } else {
      const err = new Error(respo.message);
      err.status = respo.status;
      err.statusCode = 400;
      next(err);
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
