import { Router } from "express";
import * as UserController from "../controllers/UserController";
import * as PageController from "../controllers/PageController";
import * as TemplateController from "../controllers/TemplateController";
import * as TagsController from "../controllers/TagsController";
import * as MenuController from "../controllers/MenuController";
import * as CatsController from "../controllers/CategoryController";
import * as PostController from "../controllers/PostController";
import { authMiddleware } from "../middlewares/JwtAuth";

let protectedRouter = Router();
protectedRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

//PAGE
protectedRouter.post("/page", authMiddleware, PageController.createPage);
protectedRouter.get("/page", authMiddleware, PageController.getPages);
protectedRouter.get(
  "/page/published",
  authMiddleware,
  PageController.getMenuPages
);
protectedRouter.get(
  "/page/:pageId",
  authMiddleware,
  PageController.getPageDetails
);
protectedRouter.put("/page/:pageId", authMiddleware, PageController.updatePage);
protectedRouter.delete(
  "/page/:pageId",
  authMiddleware,
  PageController.deletePage
);

//TEMPLATES
protectedRouter.post(
  "/template",
  authMiddleware,
  TemplateController.createTemplate
);
protectedRouter.get(
  "/template",
  authMiddleware,
  TemplateController.getTemplate
);
// protectedRouter.get(
//   "/template/:templateId",
//   authMiddleware,
//   TemplateController.getPageDetails
// );
protectedRouter.put(
  "/template/:templateId",
  authMiddleware,
  TemplateController.updateTemplate
);
protectedRouter.delete(
  "/template/:templateId",
  authMiddleware,
  TemplateController.deleteTemplate
);

//TAGS
protectedRouter.post("/tags", authMiddleware, TagsController.createTag);
protectedRouter.get("/tags", authMiddleware, TagsController.getTags);
protectedRouter.get(
  "/tags/published",
  authMiddleware,
  TagsController.getPublishedTags
);
protectedRouter.get(
  "/tags/:tagId",
  authMiddleware,
  TagsController.getTagDetails
);
protectedRouter.put("/tags/:tagId", authMiddleware, TagsController.updateTag);
protectedRouter.delete(
  "/tags/:tagId",
  authMiddleware,
  TagsController.deleteTag
);

//CATS
protectedRouter.post("/cats", authMiddleware, CatsController.createCat);
protectedRouter.get("/cats", authMiddleware, CatsController.getCats);
protectedRouter.get(
  "/cats/published",
  authMiddleware,
  CatsController.getPublishedCats
);
protectedRouter.get(
  "/cats/:catId",
  authMiddleware,
  CatsController.getCatDetails
);
protectedRouter.put("/cats/:catId", authMiddleware, CatsController.updateCat);
protectedRouter.delete(
  "/cats/:catId",
  authMiddleware,
  CatsController.deleteCat
);

//POSTS
protectedRouter.post("/post", authMiddleware, PostController.createPost);
protectedRouter.get("/post", authMiddleware, PostController.getPosts);
protectedRouter.get(
  "/post/:postId",
  authMiddleware,
  PostController.getPostDetails
);
protectedRouter.put("/post/:postId", authMiddleware, PostController.updatePost);
protectedRouter.delete(
  "/post/:postId",
  authMiddleware,
  PostController.deletePost
);

//MENUS
protectedRouter.post("/menu", authMiddleware, MenuController.createMenu);
protectedRouter.get("/menu", authMiddleware, MenuController.getMenus);
protectedRouter.get(
  "/menu/:menuId",
  authMiddleware,
  MenuController.getMenuDetails
);
protectedRouter.put("/menu/:menuId", authMiddleware, MenuController.updateMenu);
protectedRouter.delete(
  "/menu/:menu",
  authMiddleware,
  MenuController.deleteMenu
);
export { protectedRouter };
