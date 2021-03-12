import * as paymentRepo from "../repository/PaymentRepository";

export const createPayment = async (req, res, next) => {
  const { name, description, isKeyRequired, key, secret } = req.body;
  if (isKeyRequired && (!key || !secret)) {
    const err = new Error("Key or Secret Not Provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  let payload = {
    name,
    description,
    isKeyRequired,
    key,
    secret,
  };
  try {
    let respo = await paymentRepo.createPayment(payload);
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

export const getAllPayments = async (req, res, next) => {
  //   console.log(req);

  try {
    let respo = await paymentRepo.getAllPayments();
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

export const getAllActivatedPayments = async (req, res, next) => {
  //   console.log(req);
  try {
    // console.log(req.jwtPayload);
    let respo = await paymentRepo.getAllActivatedPayments();
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

// export const getBrandDetails = async (req, res, next) => {
//   //   console.log(req);
//   const { brandId } = req.params;
//   console.log(brandId);
//   let id = parseInt(brandId);

//   if (!id) {
//     const err = new Error("Invalid BrandId provided");
//     err.status = "fail";
//     err.statusCode = 400;
//     next(err);
//     return;
//   }

//   try {
//     let respo = await paymentRepo.getBrandDetails(id, req.jwtPayload.userid);
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

export const updatePayment = async (req, res, next) => {
  //   console.log(req);
  const { paymentId } = req.params;
  const payload = { ...req.body };
  let id = paymentId;
  if (!id) {
    const err = new Error("Invalid Payment Id provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await paymentRepo.updatePayment(id, {
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

export const activatePayment = async (req, res, next) => {
  //   console.log(req);
  const { paymentId } = req.params;
  const payload = { ...req.body };
  let id = paymentId;
  if (!id) {
    const err = new Error("Invalid Payment Id provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await paymentRepo.updatePayment(id, {
      isActivated: true,
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

export const deactivatePayment = async (req, res, next) => {
  //   console.log(req);
  const { paymentId } = req.params;
  const payload = { ...req.body };
  let id = paymentId;
  if (!id) {
    const err = new Error("Invalid Payment Id provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await paymentRepo.updatePayment(id, {
      isActivated: false,
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

export const setDefaultPayment = async (req, res, next) => {
  //   console.log(req);
  const { paymentId } = req.params;

  let id = paymentId;
  if (!id) {
    const err = new Error("Invalid Payment Id provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await paymentRepo.setDefaultPayment(id);
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
