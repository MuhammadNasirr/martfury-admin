import * as ModelRepo from "../repository/FlashSaleRepository";

export const create = async (req, res, next) => {
  const { name, status, products, endDate } = req.body;
  let payload = {
    name,
    status,
    products,
    endDate,
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
export const getDetails = async (req, res, next) => {
  //   console.log(req);
  const { flashSaleId } = req.params;
  console.log(flashSaleId);
  let id = parseInt(flashSaleId);

  if (!id) {
    const err = new Error("Invalid flashSaleId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await ModelRepo.getDetails(id, req.jwtPayload.userid);
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

export const get = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    let respo = await ModelRepo.get(page, req.query);
    if (respo.status === "success") {
      if (respo.data.flashSale.length) res.status(200).json(respo);
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
    let respo = await ModelRepo.getAllPublished();
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

export const addProduct = async (req, res, next) => {
  //   console.log(req);
  const { flashSaleId } = req.params;
  const payload = { ...req.body };

  let id = flashSaleId;
  if (!id) {
    const err = new Error("Invalid flashSaleId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let remo = await ModelRepo.removeAllProduct(id);
    let respo = await ModelRepo.addProduct(id, payload);
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

export const update = async (req, res, next) => {
  //   console.log(req);
  const { flashSaleId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(flashSaleId);
  if (!id) {
    const err = new Error("Invalid flashSaleId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.update(
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

export const updateProduct = async (req, res, next) => {
  //   console.log(req);
  const { flashSaleId } = req.params;
  const payload = req.body;
  let id = flashSaleId;
  if (!id) {
    const err = new Error("Invalid flashSaleId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let remo = await ModelRepo.removeAllProduct(id);
    // console.log(payload);
    let respo = await ModelRepo.addProduct(id, payload);
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

export const deleteProduct = async (req, res, next) => {
  //   console.log(req);
  const { flashSaleId, productId } = req.params;

  let id = flashSaleId;
  if (!id) {
    const err = new Error("Invalid flashSaleId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  if (!productId) {
    const err = new Error("Invalid productId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.removeProduct(id, productId);
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
  const { flashSaleId } = req.params;

  let id = flashSaleId;
  if (!id) {
    const err = new Error("Invalid flashSaleId provided");
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
