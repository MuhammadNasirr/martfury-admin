import * as postRepo from "../repository/PostRepository";

export const createPost = async (req, res, next) => {
  const {
    name,
    categories,
    tags,
    description,
    status,
    format,
    isFeatured,
    content,
  } = req.body;
  let payload = {
    name,
    categories,
    tags,
    description,
    status,
    format,
    createdAt: new Date(),
    isFeatured,
    content,
    author: req.jwtPayload.userid,
  };
  try {
    let respo = await postRepo.createPost(payload);
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

export const getPosts = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;

  try {
    let respo = await postRepo.getPosts(
      page - 1 || 0,
      req.jwtPayload.userid,
      req.query
    );
    if (respo.status === "success") {
      if (respo.data.posts.length) res.status(200).json(respo);
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

export const getPostDetails = async (req, res, next) => {
  //   console.log(req);
  const { postId } = req.params;
  console.log(postId);
  let id = parseInt(postId);

  if (!id) {
    const err = new Error("Invalid PostId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await postRepo.getPostDetails(id, req.jwtPayload.userid);
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

export const updatePost = async (req, res, next) => {
  //   console.log(req);
  const { postId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(postId);
  if (!id) {
    const err = new Error("Invalid postId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await postRepo.updatePost(id, payload, req.jwtPayload.userid);
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

export const deletePost = async (req, res, next) => {
  //   console.log(req);
  const { postId } = req.params;

  let id = parseInt(postId);
  if (!id) {
    const err = new Error("Invalid postId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await postRepo.deletePost(id, req.jwtPayload.userid);
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
