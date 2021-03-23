import { PAGE_LIMIT } from "../config/constants";
import Model from "../models/Customer";
import bcrypt from "bcrypt";

const modelName = "Customer";

export const create = async (payload) => {
  const model = new Model(payload);
  const modelData = await model.save();
  console.log(modelData);
  return { status: "success", message: "Successfully created" };
};

export const get = async (page, userId, query) => {
  if (query.name) {
    query.name = { $regex: query.name, $options: "i" };
  }
  const customer = await Model.find({ ...query })
    .select("id name email createdAt")
    .limit(PAGE_LIMIT)
    .skip(PAGE_LIMIT * page);

  const count = await Model.countDocuments({ ...query });

  return {
    status: "success",
    data: {
      customer,
      count,
      currentPage: page + 1,
    },
  };
};

export const getById = async (id) => {
  console.log(id);
  const customer = await Model.findOne({ id: id });

  return {
    status: "success",
    data: customer,
  };
};

export const getByEmail = async (email, password) => {
  let user = await Model.findOne({
    email: email,
  });
  console.log("customer", user);
  if (!user) return { error: "User Doesnot Exist" };
  if (user) {
    let isMatch = user.comparePassword(password, (error, match) => {
      console.log(match);
      if (!match) {
        return {
          status: "error",
          message: "The password is invalid",
        };
      }
    });
    if (!isMatch)
      return {
        status: "success",
        customer: user,
      };
    else
      return {
        status: "error",
        message: "invalid username and password pair",
      };
  }
};
export const update = async (id, payload, userId) => {
  if (payload.id) {
    delete payload.id;
  }
  if (payload._id) {
    delete payload._id;
  }
  if (payload.password) {
    payload.password = bcrypt.hashSync(payload.password, 10);
  }
  const customer = await Model.updateOne(
    { id: id },
    { ...payload },
    { runValidators: true }
  );
  if (customer.n > 0)
    return {
      status: "success",
      message: modelName + " Successfully updated",
    };
  else
    return {
      status: "fail",
      message: "Invalid " + modelName + "Id",
    };
};

export const deleteModel = async (id) => {
  const customer = await Model.deleteOne({ id: id });
  console.log(customer);
  if (customer.n > 0)
    return {
      status: "success",
      message: modelName + " Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Invalid " + modelName + "Id",
    };
};
