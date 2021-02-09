import { Router } from "express";
import * as UserController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/JwtAuth";

let protectedRouter = Router();
protectedRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

protectedRouter.post("/authP/login", authMiddleware, UserController.login);
protectedRouter.post("/authP/signup", authMiddleware, UserController.signup);

// define the about route

export { protectedRouter };
