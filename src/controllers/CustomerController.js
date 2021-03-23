import { signConstomer, signUser } from "../key";
import * as ModelRepo from "../repository/CustomerRepository";

export const create = async (req, res, next) => {
  const { name, email, password } = req.body;
  let payload = {
    name,
    email,
    password,
    createdAt: new Date(),
  };
  try {
    let respo = await ModelRepo.create(payload);
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
    if (error.message.includes("duplicate")) {
      error.message = "Email already registered";
    }
    next(error);
  }
};

export const get = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    console.log(req.jwtPayload);
    let respo = await ModelRepo.get(
      page - 1 || 0,
      req.jwtPayload.email,
      req.query
    );
    if (respo.status === "success") {
      if (respo.data.customer.length) res.status(200).json(respo);
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

export const getById = async (req, res, next) => {
  //   console.log(req);
  const { customerId } = req.params;
  console.log(customerId);
  let id = parseInt(customerId);

  if (!id) {
    const err = new Error("Invalid customerId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    console.log(req.jwtPayload);
    let respo = await ModelRepo.getById(customerId);
    if (respo.status === "success") {
      console.log(respo.data);
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

export const customerLogin = async (req, res, next) => {
  //   console.log(req);
  const { email, password } = req.body;
  try {
    if (email && password) {
      let user = await ModelRepo.getByEmail(email, password);

      console.log(user);
      if (user.status === "error") {
        const err = new Error(user.message);
        err.status = "fail";
        err.statusCode = 401;
        next(err);
      } else {
        res.status(200).json({
          _id: user.customer.id,
          token: signConstomer(
            user.customer._id,
            user.customer.name,
            user.customer.email
          ),
          email: user.customer.email,
          name: user.customer.name,
        });
      }
    } else {
      const err = new Error("email or Password missing");
      err.status = "fail";
      err.statusCode = 401;
      next(err);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const update = async (req, res, next) => {
  //   console.log(req);
  const { customerId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(customerId);
  if (!id) {
    const err = new Error("Invalid customerId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.update(id, {
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

export const deleteModel = async (req, res, next) => {
  //   console.log(req);
  const { customerId } = req.params;

  let id = parseInt(customerId);
  if (!id) {
    const err = new Error("Invalid customerId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.deleteModel(id);
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
