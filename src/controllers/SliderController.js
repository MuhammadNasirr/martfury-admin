import * as sliderRepo from "../repository/SliderRepository";

export const createSlider = async (req, res, next) => {
  const { name, description, status, key } = req.body;
  let payload = {
    name,
    description,
    status,
    key,
    createdAt: new Date(),

    author: req.jwtPayload.userid,
  };
  try {
    let respo = await sliderRepo.createSlider(payload);
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

export const getSliders = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    console.log(req.jwtPayload);
    let respo = await sliderRepo.getSliders(page - 1 || 0, req.query);
    if (respo.status === "success") {
      if (respo.data.sliders.length) res.status(200).json(respo);
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

export const getAllSliders = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    console.log(req.jwtPayload);
    let respo = await sliderRepo.getAllSliders(page - 1 || 0, req.query);
    if (respo.status === "success") {
      if (respo.data.sliders.length) res.status(200).json(respo);
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

export const getPublishedSliders = async (req, res, next) => {
  //   console.log(req);
  try {
    console.log(req.jwtPayload);
    let respo = await sliderRepo.getAllPublishedSliders(req.jwtPayload.userid);
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

export const getSliderDetails = async (req, res, next) => {
  //   console.log(req);
  const { sliderId } = req.params;
  console.log(sliderId);
  let id = parseInt(sliderId);

  if (!id) {
    const err = new Error("Invalid SliderId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }

  try {
    let respo = await sliderRepo.getSliderDetails(id, req.jwtPayload.userid);
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

export const updateSlider = async (req, res, next) => {
  //   console.log(req);
  const { sliderId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(sliderId);
  if (!id) {
    const err = new Error("Invalid SliderId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await sliderRepo.updateSlider(
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

export const deleteSlider = async (req, res, next) => {
  //   console.log(req);
  const { sliderId } = req.params;

  let id = parseInt(sliderId);
  if (!id) {
    const err = new Error("Invalid SliderId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await sliderRepo.deleteSlider(id, req.jwtPayload.userid);
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

export const createSliderItem = async (req, res, next) => {
  //   console.log(req);
  const { sliderId, itemId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(sliderId);
  if (!id) {
    const err = new Error("Invalid SliderId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await sliderRepo.createSliderItem(id, {
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

export const deleteSliderItem = async (req, res, next) => {
  //   console.log(req);
  const { sliderId, itemId } = req.params;

  let id = parseInt(sliderId);
  if (!id) {
    const err = new Error("Invalid SliderId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  let iId = itemId;
  if (!iId) {
    const err = new Error("Invalid SliderItemId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await sliderRepo.deleteSliderItem(id, iId);
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

export const updateSliderItem = async (req, res, next) => {
  //   console.log(req);
  const { sliderId, itemId } = req.params;
  const payload = { ...req.body };
  let id = parseInt(sliderId);
  if (!id) {
    const err = new Error("Invalid SliderId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  let iId = itemId;
  if (!iId) {
    const err = new Error("Invalid SliderItemId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await sliderRepo.updateSliderItem(id, iId, payload);
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
