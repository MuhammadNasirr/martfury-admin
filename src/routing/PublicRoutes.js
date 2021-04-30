import { Router } from "express";
import * as UserController from "../controllers/UserController";
import { getMenuByDisplayLocation } from "../controllers/MenuController";
import * as PageController from "../controllers/PageController";
import { customerLogin } from "../controllers/CustomerController";
import * as ProCatsController from "../controllers/ProductCategoryController";
import * as ProductController from "../controllers/ProductController";
import * as PostController from "../controllers/PostController";
import * as FaqController from "../controllers/FAQController";
import * as TagsController from "../controllers/TagsController";
import * as ProductCollectionController from "../controllers/ProductCollectionController";

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
publicRouter.get("/api/faqs", FaqController.getFaqsWithAnswer);
publicRouter.get("/api/posts", PostController.getPostsWithImage);
publicRouter.get("/post/:postId", PostController.getPostDetails);
publicRouter.get("/api/tags", TagsController.getPublishedTags);
publicRouter.get(
  "/api/collections/:collectionId",
  ProductCollectionController.getCollection
);

publicRouter.get(
  "/api/collections",
  ProductCollectionController.getAllCollection
);

// define the about route

export { publicRouter };
