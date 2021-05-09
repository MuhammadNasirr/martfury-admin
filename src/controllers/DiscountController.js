import * as ModelRepo from "../repository/DiscountRepository";

export const create = async (req, res, next) => {
  const {
    code,
    type,
    useWithPromotion,
    limit,
    couponType,
    discount,
    applyOn,
    startDate,
    endDate,
    willExpire,
    orderAmountFrom,
    collectionId,
    productId,
    customerId,
    variantId,
    productType,
    noOfProducts,
  } = req.body;
  let payload = {
    code,
    type,
    useWithPromotion,
    limit,
    couponType,
    discount,
    applyOn,
    startDate,
    endDate,
    willExpire,
    orderAmountFrom,
    collectionId,
    productId,
    customerId,
    variantId,
    productType,
    noOfProducts,
  };
  if (payload.productType === null || payload.productType === "") {
    payload.productType = undefined;
  }
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
      if (respo.data.discount.length) res.status(200).json(respo);
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

export const getByCode = async (req, res, next) => {
  //   console.log(req);
  const { couponCode } = req.params;

  if (!couponCode) {
    const err = new Error("Invalid couponCode provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    console.log(req.jwtPayload);
    let respo = await ModelRepo.getDiscountbyCode(couponCode);
    if (respo.status === "success") {
      if (respo.data.discount) res.status(200).json(respo);
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

export const deleteModel = async (req, res, next) => {
  //   console.log(req);
  const { discountId } = req.params;

  let id = parseInt(discountId);
  if (!id) {
    const err = new Error("Invalid discountId provided");
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
