import * as settingRepo from "../repository/SettingRepository";

export const createSetting = async (req, res, next) => {
  const { general, adminAppearance, email } = {
    general: {
      siteTitle: String,
      tagline: String,
      siteAddress: String,
      blogAddress: String,
      membership: String,
      adminEmail: "bobtle@bobtle.com",
      timezone: String,
      dateFormat: String,
      timeFormat: String,
    },
    adminAppearance: {
      loginBackground: ["test"],
      changeTheme: true,
      logo: "test",
      favIcon: "testy",
      title: "boblte",
      editor: "CkEditor",
      theme: "darkblue",
    },
    email: {
      domain: "test",
      senderName: "test",
      senderEmail: "test@test.com",
    },
  };
  let payload = {
    general,
    adminAppearance,
    email,
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
    let respo = await settingRepo.getSettings();
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

export const updateEmail = async (req, res, next) => {
  //   console.log(req);
  let payload = req.body;
  try {
    let respo = await settingRepo.updateEmail({
      ...payload,
    });
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
