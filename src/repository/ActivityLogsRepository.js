import { PAGE_LIMIT } from "../config/constants";
import activityLogs from "../models/ActivityLogs";

export const createLog = async (payload) => {
  try {
    const activity = new activityLogs(payload);
    const activityData = await activity.save();
    console.log(activityData);
    return { status: "success", message: "Successfully created" };
  } catch (err) {
    console.log(err);
  }
};

export const getLogs = async (page, query) => {
  if (query.action) {
    query.action = { $regex: query.action, $options: "i" };
  }
  console.log("query", query);
  const activities = await activityLogs
    .find({ ...query })
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);
  console.log(activities);
  const count = await activityLogs.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      activities,
      count,
      currentPage: page + 1,
    },
  };
};

export const deleteLogs = async (id, userId) => {
  const ad = await activityLogs.deleteOne({ id: id });
  console.log(ad);
  if (ad.n > 0)
    return {
      status: "success",
      message: "Activity Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid ActivityId",
    };
};

export const deleteAll = async () => {
  const ad = await activityLogs.deleteMany();
  console.log(ad);
  if (ad.n > 0)
    return {
      status: "success",
      message: "Activity Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid ActivityId",
    };
};
