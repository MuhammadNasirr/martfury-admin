import * as ModelRepo from "../repository/PermalinkRepository";

export const create = async (req, res, next) => {
  const { name, link } = req.body;
  let payload = {
    name,
    link,
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
    console.log(req.jwtPayload);
    let respo = await ModelRepo.get(req.query);
    if (respo.status === "success") {
      if (respo.data.permalink.length) res.status(200).json(respo);
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

export const update = async (req, res, next) => {
  //   console.log(req);

  const { permalinks } = { ...req.body };
  if (!permalinks || !permalinks.length) {
    const err = new Error("Invalid Body Provided");
    err.status = respo.status;
    err.statusCode = 400;
    next(err);
  }
  let success = 0;
  for (let i = 0; i < permalinks.length; i++) {
    let id = parseInt(permalinks[i].id);
    let payload = permalinks[i].data;
    if (!id) {
      const err = new Error("Invalid permalinkId provided");
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
        success++;
      } else {
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  if (success === permalinks.length) {
    res.status(200).json({ message: `${success} were updated` });
  } else {
    res.status(500).json({
      message: `${permalinks.length - success} failed to be updated`,
    });
  }
};
