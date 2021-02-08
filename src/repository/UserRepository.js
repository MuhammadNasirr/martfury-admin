import userModel from "../models/user";

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
    };
  }
};

export const getUser = async (payload) => {
  //console.log(payload)
  let user = await userModel.findOne({ userId: payload.userId });
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
      };
    else
      return {
        error: "invalid username and password pair",
      };
  }
};
