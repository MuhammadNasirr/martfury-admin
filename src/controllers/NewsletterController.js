import * as newsletterRepo from "../repository/NewsletterRepository";

export const createNewsletter = async (req, res, next) => {
  const { email } = req.body;
  let payload = {
    name: "-",
    email,
    status: "Subscribed",

    createdAt: new Date(),
  };
  try {
    let respo = await newsletterRepo.createNewsletter(payload);
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

export const getNewsletters = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    console.log(req.jwtPayload);
    let respo = await newsletterRepo.getNewsletters(page - 1 || 0, req.query);
    if (respo.status === "success") {
      if (respo.data.newsletters.length) res.status(200).json(respo);
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

export const deleteNewsletter = async (req, res, next) => {
  //   console.log(req);
  const { newsletterId } = req.params;

  let id = parseInt(newsletterId);
  if (!id) {
    const err = new Error("Invalid NewsletterId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await newsletterRepo.deleteNewletter(id);
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
