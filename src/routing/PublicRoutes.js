import { Router } from "express";
import * as UserController from "../controllers/UserController";
import { getMenuByDisplayLocation } from "../controllers/MenuController";
import * as PageController from "../controllers/PageController";
import { customerLogin } from "../controllers/CustomerController";
import * as ProCatsController from "../controllers/ProductCategoryController";
import * as ProductController from "../controllers/ProductController";

let publicRouter = Router();
publicRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

publicRouter.post("/auth/login", UserController.login);
publicRouter.post("/auth/signup", UserController.signup);

publicRouter.get("/api/menu/:menuId", getMenuByDisplayLocation);
publicRouter.get("/page/:pageId", PageController.getPageDetails);
publicRouter.get("/page", PageController.getPages);

publicRouter.post("/customer/login", customerLogin);

publicRouter.get(
  "/api/product/categories",
  ProCatsController.getPublishedCategory
);
publicRouter.get("/api/product", ProductController.getPublishedProducts);
publicRouter.get("/api/product/:productId", ProductController.getDetails);

// define the about route

export { publicRouter };
