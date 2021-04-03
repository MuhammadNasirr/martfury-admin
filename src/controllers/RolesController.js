import * as role from "../repository/UserRoleRepository";

export const createRole = async (req, res, next) => {
  const { name, description, isDefault, permissions } = req.body;
  let payload = {
    name,
    description,
    isDefault,
    permissions,
    createdAt: new Date(),
    createdBy: req.jwtPayload.userid,
  };
  try {
    let respo = await role.createRole(payload);
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

export const getRoles = async (req, res, next) => {
  //   console.log(req);

  try {
    let respo = await role.getRoles(req.query);
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

export const getRoleDetails = async (req, res, next) => {
  //   console.log(req);
  const { roleId } = req.params;
  let id = parseInt(roleId);
  if (!id) {
    const err = new Error("Invalid RoleId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await role.getRoleDetails(id);
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

export const updateRole = async (req, res, next) => {
  //   console.log(req);
  const { roleId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(roleId);
  if (!id) {
    const err = new Error("Invalid RoleId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await role.updateRole(id, {
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

export const deleteRole = async (req, res, next) => {
  //   console.log(req);
  const { roleId } = req.params;

  let id = parseInt(roleId);
  if (!id) {
    const err = new Error("Invalid Role ID provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await role.deleteRole(id);
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

export const getPermissions = async (req, res, next) => {
  //   console.log(req);

  try {
    let respo = await role.getPermissions();
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
