import * as catRepo from "../repository/FAQ_CategoryRepository";

export const createCat = async (req, res, next) => {
  const {
    name,

    status,

    order,
  } = req.body;
  let payload = {
    name,
    status,
    createdAt: new Date(),

    order,

    author: req.jwtPayload.userid,
  };
  try {
    let respo = await catRepo.createCat(payload);
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

export const getCats = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    console.log(req.jwtPayload);
    let respo = await catRepo.getCats(
      page - 1 || 0,
      req.jwtPayload.userid,
      req.query
    );
    if (respo.status === "success") {
      if (respo.data.cats.length) res.status(200).json(respo);
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

export const getPublishedCats = async (req, res, next) => {
  //   console.log(req);
  try {
    console.log(req.jwtPayload);
    let respo = await catRepo.getAllPublishedCats(req.jwtPayload.userid);
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

export const getCatDetails = async (req, res, next) => {
  //   console.log(req);
  const { catId } = req.params;
  console.log(catId);
  let id = parseInt(catId);

  if (!id) {
    const err = new Error("Invalid CategoryId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await catRepo.getCatDetails(id, req.jwtPayload.userid);
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

export const updateCat = async (req, res, next) => {
  //   console.log(req);
  const { catId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(catId);
  if (!id) {
    const err = new Error("Invalid CategoryId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await catRepo.updateCat(
      id,
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

export const deleteCat = async (req, res, next) => {
  //   console.log(req);
  const { catId } = req.params;

  let id = parseInt(catId);
  if (!id) {
    const err = new Error("Invalid CategoryId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await catRepo.deleteCat(id, req.jwtPayload.userid);
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
