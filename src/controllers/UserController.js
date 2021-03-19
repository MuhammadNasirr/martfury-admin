import * as userRepo from "../repository/UserRepository";
import { signUser } from "../key/index";

export const login = async (req, res, next) => {
  const { userId, password } = req.body;
  try {
    if (userId && password) {
      let user = await userRepo.getUser({ userId: userId, password });
      console.log(user);
      if (user.error) {
        const err = new Error(user.error);
        err.status = "fail";
        err.statusCode = 401;
        next(err);
      } else {
        res.status(200).json({
          _id: user.id,
          token: signUser(user.id, user.role, user.isSuper, user.userId),
          userId: user.email,
          name: user.name,
        });
      }
    } else {
      const err = new Error("UserId or Password missing");
      err.status = "fail";
      err.statusCode = 401;
      next(err);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signup = async (req, res, next) => {
  const { name, userId, password, role, status, email, isSuper } = req.body;
  console.log(req.body);
  try {
    if (userId && password) {
      let user = await userRepo.createUser({
        name,
        userId: userId,
        password: password,
        role,
        status,
        email,
        isSuper,
      });
      if (user.error) {
        const err = new Error(user.error);
        err.status = "fail";
        err.statusCode = 401;
        next(err);
        return;
      }
      res.status(200).json({
        _id: user.id,
        token: signUser(user.id, user.role, user.isSuper, user.userId),
        userId: user.userId,
        name: user.name,
      });
    } else {
      const err = new Error("UserId or Password missing");
      err.status = "fail";
      err.statusCode = 401;
      next(err);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  //   console.log(req);
  const { userId } = req.params;

  let id = userId;
  if (!id) {
    const err = new Error("Invalid UserId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await userRepo.deleteUser(id);
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

export const getUsers = async (req, res, next) => {
  //   console.log(req);
  try {
    let respo = await userRepo.getUsers();
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

export const getUserDetails = async (req, res, next) => {
  //   console.log(req);
  const { userId } = req.params;

  let id = userId;
  if (!id) {
    const err = new Error("Invalid UserId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await userRepo.getUserDetails(id);
    if (respo.status === "success") {
      if (respo.data) res.status(200).json(respo);
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

export const updateUser = async (req, res, next) => {
  //   console.log(req);
  const { userId } = req.params;
  const payload = { ...req.body };
  let id = userId;
  if (!id) {
    const err = new Error("Invalid userId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await userRepo.updateUser(id, payload);
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
