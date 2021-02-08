import * as userRepo from "../repository/UserRepository";
import { signUser } from "../key/index";

export const login = async (req, res, next) => {
  const { userId, password } = req.body;

  if (userId && password) {
    let user = await userRepo.getUser({ userId: userId, password });
    console.log(user);
    if (user.error) {
      res.status(401).json({ error: user.error });
    } else {
      res.status(200).json({
        _id: user.id,
        token: signUser(user.id),
        userId: user.email,
        name: user.name,
      });
    }
  } else res.status(400).json({ message: "UserId or Password missing" });
};

export const signup = async (req, res, next) => {
  const { name, userId, password } = req.body;
  console.log(req.body);
  if (userId && password) {
    let user = await userRepo.createUser({
      name,
      userId: userId,
      password: password,
    });
    if (user.error) {
      res.status(401).json({ error: user.error });
      return;
    }
    res.status(200).json({
      _id: user.id,
      token: signUser(user.id),
      userId: user.userId,
      name: user.name,
    });
  } else res.status(400).json({ message: "UserId or Password missing" });
};
