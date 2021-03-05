import userModel from "../models/User";

export const createUser = async (payload) => {
  let newUser;
  //console.log(payload)
  let user = await userModel.findOne({ userId: payload.userId });
  console.log(user);
  if (user) return { error: "UserId Already Exists" };
  if (!user) {
    newUser = new userModel(payload);
    const userData = await newUser.save();
    return {
      userId: userData.userId,
      name: userData.name,
      password: userData.password,
      role: userData.role,
    };
  }
};

export const getUser = async (payload) => {
  //console.log(payload)
  let user = await userModel.findOne({
    userId: payload.userId,
    softDelete: false,
  });
  console.log(user);
  if (!user) return { error: "User Doesnot Exist" };
  if (user) {
    let isMatch = user.comparePassword(payload.password, (error, match) => {
      console.log(match);
      if (!match) {
        return { error: "The password is invalid" };
      }
    });
    if (!isMatch)
      return {
        id: user._id,
        userId: user.userId,
        name: user.name,
        role: user.role,
      };
    else
      return {
        error: "invalid username and password pair",
      };
  }
};

export const deleteUser = async (id) => {
  const user = await userModel.updateOne(
    { userId: id, softDelete: false },
    { softDelete: true }
  );
  console.log(user);
  if (user.n > 0)
    return {
      status: "success",
      message: "User Successfully deleted",
    };
  else
    return {
      status: "fail",
      message: "Inavlid UserId",
    };
};
