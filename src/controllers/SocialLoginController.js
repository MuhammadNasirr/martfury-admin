import * as ModelRepo from "../repository/SocialLoginRepository";

export const create = async (req, res, next) => {
  try {
    let respo = await ModelRepo.create({});
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

export const get = async (req, res, next) => {
  //   console.log(req);

  try {
    console.log(req.jwtPayload);
    let respo = await ModelRepo.get();
    if (respo.status === "success") {
      if (respo.data.socialLogin) res.status(200).json(respo);
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

export const getEnabled = async (req, res, next) => {
  //   console.log(req);
  try {
    console.log(req.jwtPayload);
    let respo = await ModelRepo.getAllEnabled();
    if (respo.status === "success") {
      if (respo.data.socialLogin) res.status(200).json(respo);
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

export const setEnabled = async (req, res, next) => {
  //   console.log(req);

  if (!req.params?.isEnabled) {
    const err = new Error("Nothing to Upadte");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await ModelRepo.setEnable(req.params.isEnabled);
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

export const addLogin = async (req, res, next) => {
  //   console.log(req);

  const payload = req.body;

  try {
    let respo = await ModelRepo.addLogin(payload);
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

export const removeLogin = async (req, res, next) => {
  //   console.log(req);

  const { loginId } = req.params;
  let id = loginId;
  if (!id) {
    const err = new Error("Invalid LoginId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.removeLogin(id);
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

export const updateLogin = async (req, res, next) => {
  //   console.log(req);

  const { logins } = req.body;
  if (logins && logins.length) {
    let updation = 0;
    for (let i = 0; i < logins.length; i++) {
      let login = logins[i];
      let id = login.loginId;
      delete login.loginId;
      if (!id) {
        const err = new Error("Invalid LoginId provided");
        err.status = "fail";
        err.statusCode = 400;
        next(err);
        return;
      }
      try {
        let respo = await ModelRepo.updateLogin(id, { ...login });
        if (respo.status === "success") {
          updation++;
        } else {
          console.log(respo);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (updation < logins.length) {
      res.status(400).json({
        status: "fail",
        message: logins.length - updation + " were not updated",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: updation + " were updated",
      });
    }
  }
};
