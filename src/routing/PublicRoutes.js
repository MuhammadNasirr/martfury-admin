import { Router } from "express";
import * as UserController from "../controllers/UserController";

let publicRouter = Router();
publicRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

publicRouter.post("/auth/login", UserController.login);
publicRouter.post("/auth/signup", UserController.signup);

publicRouter.get("*", (req, res, next) => {
  res.status(404).json({ message: "Route does not exist" });
});
// define the about route

export { publicRouter };
