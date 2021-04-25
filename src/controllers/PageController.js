import * as pageRepo from "../repository/PageRepository";

export const createPage = async (req, res, next) => {
  const { name, template, description, isFeatured, status, content } = req.body;
  let payload = {
    name,
    template,
    description,
    isFeatured,
    status,
    content,
    createdAt: new Date(),
    author: req.jwtPayload.userid,
  };
  try {
    let respo = await pageRepo.createPage(payload);
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

export const getPages = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    let respo = await pageRepo.getPages(page - 1 || 0, req.query);
    if (respo.status === "success") {
      if (respo.data.pages.length) res.status(200).json(respo);
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

export const getMenuPages = async (req, res, next) => {
  //   console.log(req);
  try {
    let respo = await pageRepo.getMenuPages();
    if (respo.status === "success") {
      if (respo.subMenus.length) res.status(200).json(respo);
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

export const getPageDetails = async (req, res, next) => {
  //   console.log(req);
  const { pageId } = req.params;
  console.log(pageId);
  let id = parseInt(pageId);

  if (!id) {
    const err = new Error("Invalid PageId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await pageRepo.getPageDetails(id);
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

export const updatePage = async (req, res, next) => {
  //   console.log(req);
  const { pageId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(pageId);
  if (!id) {
    const err = new Error("Invalid PageId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await pageRepo.updatePage(pageId, payload);
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

export const deletePage = async (req, res, next) => {
  //   console.log(req);
  const { pageId } = req.params;

  let id = parseInt(pageId);
  if (!id) {
    const err = new Error("Invalid PageId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await pageRepo.deletePage(pageId);
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

export const getPageByName = async (req, res, next) => {
  //   console.log(req);
  const { pageId } = req.params;
  console.log(pageId);

  if (!pageId) {
    const err = new Error("Invalid PageName provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await pageRepo.getPageByName(pageId);
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
