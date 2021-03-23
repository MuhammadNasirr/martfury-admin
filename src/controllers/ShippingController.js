import * as ModelRepo from "../repository/ShippingRepository";

export const create = async (req, res, next) => {
  const { country, rules } = req.body;
  let payload = {
    country,
    rules,
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

  try {
    let respo = await ModelRepo.get();
    if (respo.status === "success") {
      if (respo.data.shipping.length) res.status(200).json(respo);
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

export const addRule = async (req, res, next) => {
  //   console.log(req);
  const { shippingId } = req.params;
  const payload = { ...req.body };

  let id = shippingId;
  if (!id) {
    const err = new Error("Invalid shippingId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.addRule(id, {
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

export const updateRule = async (req, res, next) => {
  //   console.log(req);
  const { shippingId, ruleId } = req.params;
  const payload = { ...req.body };
  let id = shippingId;
  if (!id) {
    const err = new Error("Invalid shippingId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  if (!ruleId) {
    const err = new Error("Invalid ruleId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.updateRule(id, ruleId, {
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

export const deleteRule = async (req, res, next) => {
  //   console.log(req);
  const { shippingId, ruleId } = req.params;

  let id = shippingId;
  if (!id) {
    const err = new Error("Invalid shippingId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  if (!ruleId) {
    const err = new Error("Invalid ruleId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await ModelRepo.deleteRule(id, ruleId);
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
  const { shippingId } = req.params;

  let id = shippingId;
  if (!id) {
    const err = new Error("Invalid shippingId provided");
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
