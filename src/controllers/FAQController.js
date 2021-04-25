import * as faqRepo from "../repository/FAQRepository";

export const createFaq = async (req, res, next) => {
  const { question, categories, status, answer } = req.body;
  let payload = {
    question,
    categories,
    status,
    createdAt: new Date(),
    answer,
    author: req.jwtPayload.userid,
  };
  try {
    let respo = await faqRepo.createFaq(payload);
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

export const getFaqs = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    let respo = await faqRepo.getFaqs(
      page - 1 || 0,
      req.jwtPayload.userid,
      req.query
    );
    if (respo.status === "success") {
      if (respo.data.Faqs.length) res.status(200).json(respo);
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

export const getFaqsWithAnswer = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    let respo = await faqRepo.getFaqsWithAnswer();
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

export const getFaqDetails = async (req, res, next) => {
  //   console.log(req);
  const { faqId } = req.params;
  console.log(faqId);
  let id = parseInt(faqId);

  if (!id) {
    const err = new Error("Invalid faqId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await faqRepo.getFaqDetails(id, req.jwtPayload.userid);
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

export const updateFaq = async (req, res, next) => {
  //   console.log(req);
  const { faqId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(faqId);
  if (!id) {
    const err = new Error("Invalid faqId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await faqRepo.updateFaq(id, payload, req.jwtPayload.userid);
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

export const deleteFaq = async (req, res, next) => {
  //   console.log(req);
  const { faqId } = req.params;

  let id = parseInt(faqId);
  if (!id) {
    const err = new Error("Invalid faqId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await faqRepo.deleteFaq(id, req.jwtPayload.userid);
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
