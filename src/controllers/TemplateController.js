import * as templateRepo from "../repository/TemplateRepository";

export const createTemplate = async (req, res, next) => {
  const { name, header, footer } = req.body;
  let payload = {
    name,
    header,
    footer,
  };
  try {
    let respo = await templateRepo.createTemplate(payload);
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

export const getTemplate = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  try {
    let respo = await templateRepo.getTemplates(page - 1 || 0);
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

// export const getPageDetails = async (req, res, next) => {
//   //   console.log(req);
//   const { pageId } = req.params;
//   console.log(pageId);
//   let id = parseInt(pageId);

//   if (!id) {
//     const err = new Error("Invalid PageId provided");
//     err.status = "fail";
//     err.statusCode = 400;
//     next(err);
//     return;
//   }

//   try {
//     let respo = await pageRepo.getPageDetails(id);
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

export const updateTemplate = async (req, res, next) => {
  //   console.log(req);
  const { templateId } = req.params;
  const payload = { ...req.body };
  let id = templateId;
  if (!id) {
    const err = new Error("Invalid templateId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await templateRepo.updateTemplate(id, payload);
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

export const deleteTemplate = async (req, res, next) => {
  //   console.log(req);
  const { templateId } = req.params;

  let id = templateId;
  if (!id) {
    const err = new Error("Invalid TemplateId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await templateRepo.deleteTemplate(id);
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
