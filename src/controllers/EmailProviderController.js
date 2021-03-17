import * as EmailProviderRepository from "../repository/EmailProviderRepository";

export const createEmailProvider = async (req, res, next) => {
  const { name, endpoint, isKeyRequired, key, secret } = req.body;
  if (isKeyRequired && !key) {
    const err = new Error("Key or Secret Not Provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  let payload = {
    name,
    endpoint,
    isKeyRequired,
    key,
    secret,
  };
  try {
    let respo = await EmailProviderRepository.createEmailProvider(payload);
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

export const getEmailProviders = async (req, res, next) => {
  //   console.log(req);

  try {
    let respo = await EmailProviderRepository.getEmailProviders();
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

// export const getAllActivatedPayments = async (req, res, next) => {
//   //   console.log(req);
//   try {
//     // console.log(req.jwtPayload);
//     let respo = await EmailProviderRepository.getAllActivatedPayments();
//     if (respo.status === "success") {
//       if (respo.data.length) res.status(200).json(respo);
//       else {
//         res.status(204).json(respo);
//       }
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

// export const getPayment = async (id) => {
//   //   console.log(req);
//   try {
//     // console.log(req.jwtPayload);
//     let respo = await EmailProviderRepository.getPayment(id);
//     return respo.data;
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

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
//     let respo = await EmailProviderRepository.getBrandDetails(id, req.jwtPayload.userid);
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

export const updateEmailProvider = async (req, res, next) => {
  //   console.log(req);
  const { emailProviderId } = req.params;
  const payload = { ...req.body };
  let id = emailProviderId;
  if (!id) {
    const err = new Error("Invalid Email Provider Id provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await EmailProviderRepository.updateEmailProvider(id, {
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

// export const activatePayment = async (req, res, next) => {
//   //   console.log(req);
//   const { paymentId } = req.params;
//   const payload = { ...req.body };
//   let id = paymentId;
//   if (!id) {
//     const err = new Error("Invalid Payment Id provided");
//     err.status = "fail";
//     err.statusCode = 400;
//     next(err);
//     return;
//   }
//   try {
//     let respo = await EmailProviderRepository.updatePayment(id, {
//       isActivated: true,
//     });
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

// export const deactivatePayment = async (req, res, next) => {
//   //   console.log(req);
//   const { paymentId } = req.params;
//   const payload = { ...req.body };
//   let id = paymentId;
//   if (!id) {
//     const err = new Error("Invalid Payment Id provided");
//     err.status = "fail";
//     err.statusCode = 400;
//     next(err);
//     return;
//   }
//   try {
//     let respo = await EmailProviderRepository.updatePayment(id, {
//       isActivated: false,
//     });
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

export const setDefaultEmailProvider = async (req, res, next) => {
  //   console.log(req);
  const { emailProviderId } = req.params;

  let id = emailProviderId;
  if (!id) {
    const err = new Error("Invalid Email Provider provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await EmailProviderRepository.setDefaultEmailProvider(id);
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
