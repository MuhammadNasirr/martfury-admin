import { Router } from "express";
import * as UserController from "../controllers/UserController";
import { getMenuByDisplayLocation } from "../controllers/MenuController";
import { getPageByName } from "../controllers/PageController";
import { customerLogin } from "../controllers/CustomerController";

let publicRouter = Router();
publicRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

publicRouter.post("/auth/login", UserController.login);
publicRouter.post("/auth/signup", UserController.signup);

publicRouter.get("/api/menu/:menuId", getMenuByDisplayLocation);
publicRouter.get("/api/page/:pageId", getPageByName);

publicRouter.post("/customer/login", customerLogin);
// define the about route

export { publicRouter };
