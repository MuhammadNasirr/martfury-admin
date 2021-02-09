import { Router } from "express";
import * as UserController from "../controllers/UserController";
import * as PageController from "../controllers/PageController";
import { authMiddleware } from "../middlewares/JwtAuth";

let protectedRouter = Router();
protectedRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

protectedRouter.post("/page", PageController.createPage);
protectedRouter.get("/page", PageController.getPages);
protectedRouter.get("/page/:pageId", PageController.getPageDetails);
protectedRouter.put("/page/:pageId", PageController.updatePage);
protectedRouter.delete("/page/:pageId", PageController.deletePage);

protectedRouter.post("/authP/login", authMiddleware, UserController.login);
protectedRouter.post("/authP/signup", authMiddleware, UserController.signup);

// define the about route

export { protectedRouter };
