import * as ModelRepo from "../repository/ProductsRepository";

export const create = async (req, res, next) => {
  const {
    name,
    description,
    content,
    images,
    sku,
    price,
    salePrice,
    discountDate,
    inStore,
    quantity,
    stockStatus,
    allowCheckout,
    shipping,
    attributes,
    status,
    order,
    isFeatured,
    categories,
    tags,
    brand,
    productCollection,
    tax,
  } = req.body;
  let payload = {
    name,
    description,
    content,
    images,
    sku,
    price,
    salePrice,
    discountDate,
    inStore,
    quantity,
    stockStatus,
    allowCheckout,
    shipping,
    attributes,
    status,
    order,
    isFeatured,
    categories,
    tags,
    brand,
    productCollection,
    tax,
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
      if (respo.data.products.length) res.status(200).json(respo);
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

export const getPublishedProducts = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    console.log(req.jwtPayload);
    let respo = await ModelRepo.getPublishedProducts(page - 1 || 0, req.query);
    if (respo.status === "success") {
      if (respo.data.products.length) res.status(200).json(respo);
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
    let respo = await ModelRepo.getAllPublished(req.query);
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

export const getDetails = async (req, res, next) => {
  //   console.log(req);
  const { productId } = req.params;
  console.log(productId);
  let id = parseInt(productId);

  if (!id) {
    const err = new Error("Invalid productId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await ModelRepo.getDetails(id);
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

export const getVariations = async (req, res, next) => {
  //   console.log(req);
  const { productId } = req.params;
  console.log(productId);
  let id = parseInt(productId);

  if (!id) {
    const err = new Error("Invalid productId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await ModelRepo.getVariations(id);
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

export const update = async (req, res, next) => {
  //   console.log(req);
  const { productId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(productId);
  if (!id) {
    const err = new Error("Invalid productId provided");
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

export const updateVariation = async (req, res, next) => {
  //   console.log(req);
  const { variationId } = req.params;
  const payload = { ...req.body };
  let id = variationId;
  if (!id) {
    const err = new Error("Invalid variationId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.updateVariation(id, {
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

export const createVariation = async (req, res, next) => {
  //   console.log(req);
  const { productId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(productId);
  if (!id) {
    const err = new Error("Invalid productId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.createVariation(id, {
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

export const deleteModel = async (req, res, next) => {
  //   console.log(req);
  const { productId } = req.params;

  let id = parseInt(productId);
  if (!id) {
    const err = new Error("Invalid productId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.deleteVariation(id, req.jwtPayload.userid);
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

export const deleteVariation = async (req, res, next) => {
  //   console.log(req);
  const { variationId } = req.params;

  let id = variationId;
  if (!id) {
    const err = new Error("Invalid variationId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.deleteVariation(id, req.jwtPayload.userid);
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
