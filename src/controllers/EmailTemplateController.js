import * as EmailTemplateRepository from "../repository/EmailTemplateRepository";

export const createEmailTemplate = async (req, res, next) => {
  const {
    template,
    description,
    enabled,
    subject,
    slug,
    body,
    category,
  } = req.body;

  let payload = {
    template,
    description,
    enabled,
    subject,
    slug,
    body,
    category,
  };
  try {
    let respo = await EmailTemplateRepository.createEmailTemplate(payload);
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

// export const getEmailProviders = async (req, res, next) => {
//   //   console.log(req);

//   try {
//     let respo = await EmailTemplateRepository.getEmailProviders();
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

// export const getAllActivatedPayments = async (req, res, next) => {
//   //   console.log(req);
//   try {
//     // console.log(req.jwtPayload);
//     let respo = await EmailTemplateRepository.getAllActivatedPayments();
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
//     let respo = await EmailTemplateRepository.getPayment(id);
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
//     let respo = await EmailTemplateRepository.getBrandDetails(id, req.jwtPayload.userid);
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

export const updateEmailBody = async (req, res, next) => {
  //   console.log(req);
  const { emailTemplateId } = req.params;
  const payload = { ...req.body };
  let id = emailTemplateId;
  if (!id) {
    const err = new Error("Invalid Email Template Id provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await EmailTemplateRepository.updateEmailBody(id, {
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

export const getEmailTemplateById = async (req, res, next) => {
  //   console.log(req);
  const { emailTemplateId } = req.params;
  const payload = { ...req.body };
  let id = emailTemplateId;
  if (!id) {
    const err = new Error("Invalid Email Template Id provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await EmailTemplateRepository.getEmailTemplateById(id);
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
//     let respo = await EmailTemplateRepository.updatePayment(id, {
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
//     let respo = await EmailTemplateRepository.updatePayment(id, {
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

// export const setDefaultEmailProvider = async (req, res, next) => {
//   //   console.log(req);
//   const { emailProviderId } = req.params;

//   let id = emailProviderId;
//   if (!id) {
//     const err = new Error("Invalid Email Provider provided");
//     err.status = "fail";
//     err.statusCode = 400;
//     next(err);
//     return;
//   }
//   try {
//     let respo = await EmailTemplateRepository.setDefaultEmailProvider(id);
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
