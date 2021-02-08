import * as userRepo from "../repository/UserRepository";
import { signUser } from "../key/index";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    let user = await userRepo.getUser({ email: email, password });
    console.log(user);
    if (user.error) {
      res.status(401).json({ error: user.error });
    } else {
      res.status(200).json({
        _id: user.id,
        token: signUser(user.id),
        email: user.email,
        name: user.name,
      });
    }
  } else res.status(400).json({ message: "Email or Password missing" });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (email && password) {
    let user = await userRepo.createUser({
      name,
      email: email,
      password: password,
    });
    if (user.error) {
      res.status(401).json({ error: user.error });
      return;
    }
    res.status(200).json({
      _id: user.id,
      token: signUser(user.id),
      email: user.email,
      name: user.name,
    });
  } else res.status(400).json({ message: "Email or Password missing" });
};
