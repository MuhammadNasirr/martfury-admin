import * as tagRepo from "../repository/TagsRepository";

export const createTag = async (req, res, next) => {
  const { name, template, description, isFeatured, status, content } = req.body;
  let payload = {
    name,
    description,
    status,
    createdAt: new Date(),
  };
  try {
    let respo = await tagRepo.createTag(payload);
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

export const getTags = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  try {
    let respo = await tagRepo.getTags(page - 1 || 0);
    if (respo.status === "success") {
      if (respo.data.tags.length) res.status(200).json(respo);
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

export const getTagDetails = async (req, res, next) => {
  //   console.log(req);
  const { tagId } = req.params;
  console.log(tagId);
  let id = parseInt(tagId);

  if (!id) {
    const err = new Error("Invalid TagId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await tagRepo.getTagDetails(id);
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

export const updateTag = async (req, res, next) => {
  //   console.log(req);
  const { tagId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(tagId);
  if (!id) {
    const err = new Error("Invalid TagId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await tagRepo.updateTag(id, payload);
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

export const deleteTag = async (req, res, next) => {
  //   console.log(req);
  const { tagId } = req.params;

  let id = parseInt(tagId);
  if (!id) {
    const err = new Error("Invalid TagId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await tagRepo.deleteTag(id);
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