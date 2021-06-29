import { Router } from "express";
import * as UserController from "../controllers/UserController";
import { getMenuByDisplayLocation } from "../controllers/MenuController";
import * as PageController from "../controllers/PageController";
import { customerLogin } from "../controllers/CustomerController";
import * as ProCatsController from "../controllers/ProductCategoryController";
import * as ProductController from "../controllers/ProductController";
import * as PostController from "../controllers/PostController";
import * as CategoryController from "../controllers/CategoryController";
import * as FaqController from "../controllers/FAQController";
import * as TagsController from "../controllers/TagsController";
import * as ProductCollectionController from "../controllers/ProductCollectionController";
import * as AdsController from "../controllers/AdsController";
import * as SliderController from "../controllers/SliderController";
import * as SocialLoginController from "../controllers/SocialLoginController";
import * as LanguageController from "../controllers/LanguageController";
import * as BrandController from "../controllers/BrandController";
import * as ProductTagController from "../controllers/ProductTagController";
import * as ProductAttributeController from "../controllers/ProductAttributeController";
import * as NewsletterController from "../controllers/NewsletterController";

import * as PluginController from "../controllers/PluginController";

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
  ProCatsController.getPublishedCategoryPublic
);
publicRouter.get("/api/product", ProductController.getPublishedProducts);
publicRouter.get("/api/product/deals", ProductController.getDealsOfTheDay);
publicRouter.get("/api/product/all", ProductController.getProductsWithVariant);
publicRouter.get(
  "/api/product/tags",
  ProductTagController.getPublishedTagsWithProductCount
);
publicRouter.get(
  "/api/product/attributes",
  ProductAttributeController.getPublishedAttrs
);
publicRouter.get("/api/product/:productId", ProductController.getDetails);
publicRouter.get("/api/faqs", FaqController.getFaqsWithAnswer);
publicRouter.get("/api/posts", PostController.getPostsWithImage);
publicRouter.get(
  "/api/post/categories",
  CategoryController.getAllPublishedCats
);
publicRouter.get("/api/post/:postId", PostController.getPostDetails);
publicRouter.get("/api/tags", TagsController.getPublishedTags);

publicRouter.get(
  "/api/collections/slug/:slug",
  ProductCollectionController.getCollectionBySlug
);

publicRouter.get(
  "/api/collections",
  ProductCollectionController.getAllCollection
);
publicRouter.get(
  "/api/collections/:collectionId",
  ProductCollectionController.getCollection
);

publicRouter.get("/api/ads", AdsController.getAllAds);
publicRouter.get("/api/slider", SliderController.getAllSliders);

publicRouter.get("/api/socialLogin", SocialLoginController.getEnabled);
publicRouter.get("/api/locale", LanguageController.getAllLocale);
publicRouter.get("/api/plugins", PluginController.getPlugins);
publicRouter.get(
  "/api/brands",
  BrandController.getPublishedBrandsWithProductCount
);
publicRouter.get(
  "/api/newsletter",
  NewsletterController.getNewsletters
);

publicRouter.post(
  "/api/newsletter",
  NewsletterController.createNewsletter
);

// define the about route

export { publicRouter };
