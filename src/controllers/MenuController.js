import * as menuRepo from "../repository/MenuRepository";

export const createMenu = async (req, res, next) => {
  const { name, status, structure, displayLocation } = req.body;
  let payload = {
    name,
    structure,
    status,
    displayLocation,
    createdAt: new Date(),
    author: req.jwtPayload.userid,
  };
  try {
    let respo = await menuRepo.createMenu(payload);
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

export const getMenus = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  try {
    let respo = await menuRepo.getMenus(page - 1 || 0, req.jwtPayload.userid);
    if (respo.status === "success") {
      if (respo.data.menus.length) res.status(200).json(respo);
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

export const getMenuDetails = async (req, res, next) => {
  //   console.log(req);
  const { menuId } = req.params;
  console.log(menuId);
  let id = parseInt(menuId);

  if (!id) {
    const err = new Error("Invalid menuId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await menuRepo.getMenuDetails(id, req.jwtPayload.userid);
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

export const getMenuByDisplayLocation = async (req, res, next) => {
  //   console.log(req);
  const { menuId } = req.params;

  if (menuId !== "Main" && menuId !== "Header" && menuId !== "Footer") {
    const err = new Error("Invalid menu type provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await menuRepo.getMenuByDisplayLocation(menuId);
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

export const updateMenu = async (req, res, next) => {
  //   console.log(req);
  const { menuId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(menuId);
  if (!id) {
    const err = new Error("Invalid menuId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await menuRepo.updateMenu(id, payload, req.jwtPayload.userid);
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

export const deleteMenu = async (req, res, next) => {
  //   console.log(req);
  const { menuId } = req.params;

  let id = parseInt(menuId);
  if (!id) {
    const err = new Error("Invalid menuId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await menuRepo.deleteMenu(id, req.jwtPayload.userid);
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
