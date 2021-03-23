import * as ModelRepo from "../repository/ReviewRepository";

export const create = async (req, res, next) => {
  console.log(req.jwtPayload.id);
  const { product, stars, comment } = req.body;
  let payload = {
    product,
    stars,
    comment,
    status: "Published",
    customer: req.jwtPayload.id,
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
      req.jwtPayload.userid,
      req.query
    );
    if (respo.status === "success") {
      if (respo.data.review.length) res.status(200).json(respo);
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

export const getPublished = async (req, res, next) => {
  //   console.log(req);
  try {
    console.log(req.jwtPayload);
    let respo = await ModelRepo.getAllPublished(req.jwtPayload.userid);
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

export const getReviewByProduct = async (req, res, next) => {
  //   console.log(req);

  const { productId } = req.params;
  try {
    let respo = await ModelRepo.getReviewByProduct(productId);
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

export const getReviewByCustomer = async (req, res, next) => {
  //   console.log(req);

  try {
    console.log(req.jwtPayload.id);
    let respo = await ModelRepo.getReviewByCustomer(req.jwtPayload.id);
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

// export const getDetails = async (req, res, next) => {
//   //   console.log(req);
//   const { collectionId } = req.params;
//   console.log(collectionId);
//   let id = parseInt(collectionId);

//   if (!id) {
//     const err = new Error("Invalid collectionId provided");
//     err.status = "fail";
//     err.statusCode = 400;
//     next(err);
//     return;
//   }

//   try {
//     let respo = await ModelRepo.getDetails(id, req.jwtPayload.userid);
//     if (respo.status === "success") {
//       if (respo.data) res.status(200).json(respo);
//       else res.status(204).json(respo);
//     } else {
//       const err = new Error(respo.message);
//       err.status = respo.status;
//       err.statusCode = 400;
//       next(err);
//       return;
//     }
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// export const update = async (req, res, next) => {
//   //   console.log(req);
//   const { reviewId } = req.params;
//   const payload = { ...req.body };
//   let id = parseInt(reviewId);
//   if (!id) {
//     const err = new Error("Invalid reviewId provided");
//     err.status = "fail";
//     err.statusCode = 400;
//     next(err);
//     return;
//   }
//   try {
//     let respo = await ModelRepo.update(
//       id,
//       {
//         ...payload,
//       },
//       req.jwtPayload.userid
//     );
//     if (respo.status === "success") {
//       res.status(200).json(respo);
//     } else {
//       const err = new Error(respo.message);
//       err.status = respo.status;
//       err.statusCode = 400;
//       next(err);
//       return;
//     }
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

export const deleteModel = async (req, res, next) => {
  //   console.log(req);
  const { reviewId } = req.params;

  let id = parseInt(reviewId);
  if (!id) {
    const err = new Error("Invalid reviewId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.deleteModel(id, req.jwtPayload.userid);
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
