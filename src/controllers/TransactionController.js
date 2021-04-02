import * as ModelRepo from "../repository/TransactionRepository";

export const create = async (req, res, next) => {
  const { chargeId, status, paymentChannel, total } = req.body;
  let payload = {
    chargeId,
    status,
    paymentChannel,
    total,
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
      if (respo.data.transactions.length) res.status(200).json(respo);
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
  const { transactionId } = req.params;
  console.log(transactionId);
  let id = parseInt(transactionId);

  if (!id) {
    const err = new Error("Invalid transactionId provided");
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

export const update = async (req, res, next) => {
  //   console.log(req);
  const { transactionId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(transactionId);
  if (!id) {
    const err = new Error("Invalid transactionId provided");
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

export const deleteModel = async (req, res, next) => {
  //   console.log(req);
  const { transactionId } = req.params;

  let id = parseInt(transactionId);
  if (!id) {
    const err = new Error("Invalid transactionId provided");
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
