import * as attrRepo from "../repository/ProductAttributesRepository";

export const createAttr = async (req, res, next) => {
  const {
    title,
    slug,
    status,
    layout,
    searchable,
    comparable,
    usedProductListing,
    order,
    attributesList,
  } = req.body;
  let payload = {
    title,
    slug,
    status,
    layout,
    searchable,
    comparable,
    usedProductListing,
    order,
    attributesList,
    createdAt: new Date(),

    author: req.jwtPayload.userid,
  };
  try {
    let respo = await attrRepo.createAttr(payload);
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

export const getAttrs = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    console.log(req.jwtPayload);
    let respo = await attrRepo.getAttrs(
      page - 1 || 0,
      req.jwtPayload.userid,
      req.query
    );
    if (respo.status === "success") {
      if (respo.data.attributes.length) res.status(200).json(respo);
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

export const getPublishedAttrs = async (req, res, next) => {
  //   console.log(req);
  try {
    console.log(req.jwtPayload);
    let respo = await attrRepo.getAllPublishedAttrs(req.jwtPayload.userid);
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

export const getAttrDetails = async (req, res, next) => {
  //   console.log(req);
  const { attrId } = req.params;
  console.log(attrId);
  let id = parseInt(attrId);

  if (!id) {
    const err = new Error("Invalid ProductAttributeID provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await attrRepo.getAttrDetails(id, req.jwtPayload.userid);
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

export const updateAttr = async (req, res, next) => {
  //   console.log(req);
  const { attrId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(attrId);
  if (!id) {
    const err = new Error("Invalid ProductAttributeID provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await attrRepo.updateAttr(
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

export const deleteAttr = async (req, res, next) => {
  //   console.log(req);
  const { attrId } = req.params;

  let id = parseInt(attrId);
  if (!id) {
    const err = new Error("Invalid ProductAttributeID provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await attrRepo.deleteAttr(id, req.jwtPayload.userid);
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
