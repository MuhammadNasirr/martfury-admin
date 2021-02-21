import { Router } from "express";
import * as UserController from "../controllers/UserController";
import * as PageController from "../controllers/PageController";
import * as TemplateController from "../controllers/TemplateController";
import * as TagsController from "../controllers/TagsController";
import * as ContactController from "../controllers/ContactController";
import * as MenuController from "../controllers/MenuController";
import * as CatsController from "../controllers/CategoryController";
import * as AdsController from "../controllers/AdsController";
import * as NewsletterController from "../controllers/NewsletterController";
import * as FAQ_CATController from "../controllers/FAQ_CategoryController";
import * as FaqController from "../controllers/FAQController";
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

//ADS
protectedRouter.post("/ads", authMiddleware, AdsController.createAd);
protectedRouter.get("/ads", authMiddleware, AdsController.getAds);
protectedRouter.get(
  "/ads/published",
  authMiddleware,
  AdsController.getPublishedAds
);
protectedRouter.get("/ads/:adId", authMiddleware, AdsController.getAdDetails);
protectedRouter.put("/ads/:adId", authMiddleware, AdsController.updateAd);
protectedRouter.delete("/ads/:adId", authMiddleware, AdsController.deleteAd);

protectedRouter.post(
  "/newsletter",
  authMiddleware,
  NewsletterController.createNewsletter
);
protectedRouter.get(
  "/newsletter",
  authMiddleware,
  NewsletterController.getNewsletters
);
protectedRouter.delete(
  "/newsletter/:newsletterId",
  authMiddleware,
  NewsletterController.deleteNewsletter
);

//FAQ_CATS
protectedRouter.post("/faq/cats", authMiddleware, FAQ_CATController.createCat);
protectedRouter.get("/faq/cats", authMiddleware, FAQ_CATController.getCats);
protectedRouter.get(
  "/faq/cats/published",
  authMiddleware,
  FAQ_CATController.getPublishedCats
);
protectedRouter.get(
  "/faq/cats/:catId",
  authMiddleware,
  FAQ_CATController.getCatDetails
);
protectedRouter.put(
  "/faq/cats/:catId",
  authMiddleware,
  FAQ_CATController.updateCat
);
protectedRouter.delete(
  "/faq/cats/:catId",
  authMiddleware,
  FAQ_CATController.deleteCat
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

//Faqs
protectedRouter.post("/faq", authMiddleware, FaqController.createFaq);
protectedRouter.get("/faq", authMiddleware, FaqController.getFaqs);
protectedRouter.get("/faq/:faqId", authMiddleware, FaqController.getFaqDetails);
protectedRouter.put("/faq/:faqId", authMiddleware, FaqController.updateFaq);
protectedRouter.delete("/faq/:faqId", authMiddleware, FaqController.deleteFaq);

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
  "/menu/:menuId",
  authMiddleware,
  MenuController.deleteMenu
);

//Contact
protectedRouter.post(
  "/contact",
  authMiddleware,
  ContactController.createContact
);
protectedRouter.get("/contact", authMiddleware, ContactController.getContacts);

protectedRouter.post(
  "/contact/:contactId/reply",
  authMiddleware,
  ContactController.addReply
);

// protectedRouter.get(

//   "/contact/published",
//   authMiddleware,
//   ContactController.getPublishedcontact
// );
protectedRouter.get(
  "/contact/:contactId",
  authMiddleware,
  ContactController.getContactDetails
);
protectedRouter.put(
  "/contact/:contactId",
  authMiddleware,
  ContactController.updateContact
);
protectedRouter.delete(
  "/contact/:contactId",
  authMiddleware,
  ContactController.deleteContact
);

export { protectedRouter };
