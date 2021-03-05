import * as settingRepo from "../repository/SettingRepository";

export const createSetting = async (req, res, next) => {
  const { general, adminAppearance } = req.body;
  let payload = {
    general,
    adminAppearance,
    author: req.jwtPayload.userid,
  };
  try {
    let respo = await settingRepo.createSettings(payload);
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

export const getSetting = async (req, res, next) => {
  //   console.log(req);

  try {
    let respo = await settingRepo.getSettings(req.jwtPayload.userid);
    if (respo.status === "success") {
      if (respo.data) res.status(200).json(respo);
      else res.status(204).json(respo);
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

export const updateSetting = async (req, res, next) => {
  //   console.log(req);
  let payload = req.body;
  try {
    let respo = await settingRepo.updateSetting(
      {
        ...payload,
      },
      req.jwtPayload.userid
    );
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
