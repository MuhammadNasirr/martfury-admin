import * as activityRepo from "../repository/ActivityLogsRepository";

export const getActvities = async (req, res, next) => {
  //   console.log(req);
  const { page } = req.query;
  delete req.query.page;
  try {
    console.log(req.jwtPayload);
    let respo = await activityRepo.getLogs(page - 1 || 0, req.query);
    if (respo.status === "success") {
      if (respo.data.activities.length) res.status(200).json(respo);
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

export const deleteActivity = async (req, res, next) => {
  //   console.log(req);
  const { activityId } = req.params;

  let id = parseInt(activityId);
  if (!id) {
    const err = new Error("Invalid ActivityId provided");
    err.status = "fail";
    err.statusCode = 400;
    next(err);
    return;
  }
  try {
    let respo = await activityRepo.deleteLogs(id);
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

export const deleteAll = async (req, res, next) => {
  //   console.log(req);

  try {
    let respo = await activityRepo.deleteAll();
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
