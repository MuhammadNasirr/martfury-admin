import { Router } from "express";
import * as UserController from "../controllers/UserController";
import * as PageController from "../controllers/PageController";
import * as FlashSaleController from "../controllers/FlashSaleController";
import * as DiscountController from "../controllers/DiscountController";
import * as TemplateController from "../controllers/TemplateController";
import * as ReportController from "../controllers/ReportsController";
import * as TaxController from "../controllers/TaxController";
import * as PermalinkController from "../controllers/PermalinkController";
import * as SocialLoginController from "../controllers/SocialLoginController";
import * as TransactionController from "../controllers/TransactionController";
import * as BrandController from "../controllers/BrandController";
import * as TagsController from "../controllers/TagsController";
import * as ShippingController from "../controllers/ShippingController";
import * as ProductTagController from "../controllers/ProductTagController";
import * as ProductCollectionController from "../controllers/ProductCollectionController";
import * as CustomerController from "../controllers/CustomerController";
import * as ReviewController from "../controllers/ReviewController";
import * as PaymentMethodController from "../controllers/PaymentMethodController";
import * as ContactController from "../controllers/ContactController";
import * as MenuController from "../controllers/MenuController";
import * as CatsController from "../controllers/CategoryController";
import * as ProCatsController from "../controllers/ProductCategoryController";
import * as ProAttrController from "../controllers/ProductAttributeController";
import * as AdsController from "../controllers/AdsController";
import * as LangController from "../controllers/LanguageController";
import * as PluginController from "../controllers/PluginController";
import * as MediaController from "../controllers/MediaController";
import * as ProductController from "../controllers/ProductController";
import * as EmailProviderController from "../controllers/EmailProviderController";
import * as EmailTemplateController from "../controllers/EmailTemplateController";
import * as SliderController from "../controllers/SliderController";
import * as NewsletterController from "../controllers/NewsletterController";
import * as RolesController from "../controllers/RolesController";
import * as ActivityLogsController from "../controllers/ActivityLogController";
import * as FAQ_CATController from "../controllers/FAQ_CategoryController";
import * as FaqController from "../controllers/FAQController";
import * as PostController from "../controllers/PostController";
import * as SettingsController from "../controllers/SettingsController";
import * as OrderController from "../controllers/OrderController";
import { authMiddleware } from "../middlewares/JwtAuth";
import Slider from "../models/Slider";
import multer from "multer";
import Email from "../models/Email";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

var upload = multer({ storage: storage });
// console.log(upload);

let protectedRouter = Router();
protectedRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  // authMiddleware(req,res,next)
  // if()
  next();
});

protectedRouter.delete(
  "/auth/user/:userId",
  authMiddleware,
  UserController.deleteUser
);
protectedRouter.put(
  "/auth/user/:userId",
  authMiddleware,
  UserController.updateUser
);
protectedRouter.get("/users", authMiddleware, UserController.getUsers);
protectedRouter.get(
  "/users/:userId",
  authMiddleware,
  UserController.getUserDetails
);

//MEDIA
protectedRouter.post(
  "/media",
  authMiddleware,
  upload.array("media", 12),
  (req, res, next) => {
    // console.log(req);
    const files = req.files;
    if (files === null || files === undefined) {
      console.log("files", files);
      const error = new Error("Please choose files");
      error.httpStatusCode = 400;
      return next(error);
    }
    MediaController.addMedia(req, res, next);
  }
);

//PAGE
protectedRouter.post("/page", authMiddleware, PageController.createPage);
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

//PRODUCT CATS
protectedRouter.post(
  "/product/cats",
  authMiddleware,
  ProCatsController.createCat
);
protectedRouter.get("/product/cats", authMiddleware, ProCatsController.getCats);
protectedRouter.get(
  "/product/cats/published",
  authMiddleware,
  ProCatsController.getPublishedCats
);
protectedRouter.get(
  "/product/cats/:catId",
  authMiddleware,
  ProCatsController.getCatDetails
);
protectedRouter.put(
  "/product/cats/:catId",
  authMiddleware,
  ProCatsController.updateCat
);
protectedRouter.delete(
  "/product/cats/:catId",
  authMiddleware,
  ProCatsController.deleteCat
);

//Product Tags
protectedRouter.post(
  "/product/tags",
  authMiddleware,
  ProductTagController.createTag
);
protectedRouter.get(
  "/product/tags",
  authMiddleware,
  ProductTagController.getTags
);
protectedRouter.get(
  "/product/tags/published",
  authMiddleware,
  ProductTagController.getPublishedTags
);
protectedRouter.get(
  "/product/tags/:tagId",
  authMiddleware,
  ProductTagController.getTagDetails
);
protectedRouter.put(
  "/product/tags/:tagId",
  authMiddleware,
  ProductTagController.updateTag
);
protectedRouter.delete(
  "/product/tags/:tagId",
  authMiddleware,
  ProductTagController.deleteTag
);

//BRAND
protectedRouter.post("/brands", authMiddleware, BrandController.createBrand);
protectedRouter.get("/brands", authMiddleware, BrandController.getBrands);
protectedRouter.get(
  "/brands/published",
  authMiddleware,
  BrandController.getPublishedBrands
);
protectedRouter.get(
  "/brands/:brandId",
  authMiddleware,
  BrandController.getBrandDetails
);
protectedRouter.put(
  "/brands/:brandId",
  authMiddleware,
  BrandController.updateBrand
);
protectedRouter.delete(
  "/brands/:brandId",
  authMiddleware,
  BrandController.deleteBrand
);

//TAXES
protectedRouter.post("/taxes", authMiddleware, TaxController.createTax);
protectedRouter.get("/taxes", authMiddleware, TaxController.getTaxes);
protectedRouter.get(
  "/taxes/published",
  authMiddleware,
  TaxController.getPublishedTaxes
);
protectedRouter.get(
  "/taxes/:taxId",
  authMiddleware,
  TaxController.getTaxDetails
);
protectedRouter.put("/taxes/:taxId", authMiddleware, TaxController.updateTax);
protectedRouter.delete(
  "/taxes/:taxId",
  authMiddleware,
  TaxController.deleteTax
);

//ProductCollection
protectedRouter.post(
  "/collection",
  authMiddleware,
  ProductCollectionController.create
);
protectedRouter.get(
  "/collection",
  authMiddleware,
  ProductCollectionController.get
);
protectedRouter.get(
  "/collection/published",
  authMiddleware,
  ProductCollectionController.getPublished
);
protectedRouter.get(
  "/collection/:collectionId",
  authMiddleware,
  ProductCollectionController.getDetails
);
protectedRouter.put(
  "/collection/:collectionId",
  authMiddleware,
  ProductCollectionController.update
);
protectedRouter.delete(
  "/collection/:collectionId",
  authMiddleware,
  ProductCollectionController.deleteModel
);

//PRODUCT ATTRIBUTES
protectedRouter.post(
  "/product/attr",
  authMiddleware,
  ProAttrController.createAttr
);
protectedRouter.get(
  "/product/attr",
  authMiddleware,
  ProAttrController.getAttrs
);
protectedRouter.get(
  "/product/attr/published",
  authMiddleware,
  ProAttrController.getPublishedAttrs
);
protectedRouter.get(
  "/product/attr/:attrId",
  authMiddleware,
  ProAttrController.getAttrDetails
);
protectedRouter.put(
  "/product/attr/:attrId",
  authMiddleware,
  ProAttrController.updateAttr
);
protectedRouter.delete(
  "/product/attr/:attrId",
  authMiddleware,
  ProAttrController.deleteAttr
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

//PLUGINS
protectedRouter.post("/plugins", authMiddleware, PluginController.createPlugin);
protectedRouter.get("/plugins", authMiddleware, PluginController.getPlugins);
protectedRouter.put(
  "/plugins/:pluginId/activate",
  authMiddleware,
  PluginController.activatePlugin
);
protectedRouter.put(
  "/plugins/:pluginId/deactivate",
  authMiddleware,
  PluginController.deactivatePlugin
);
protectedRouter.delete(
  "/plugins/:pluginId",
  authMiddleware,
  PluginController.deletePlugin
);

//SETTINGS
protectedRouter.post(
  "/settings/setup",
  authMiddleware,
  SettingsController.createSetting
);
protectedRouter.get("/settings", authMiddleware, SettingsController.getSetting);

protectedRouter.put(
  "/settings",
  authMiddleware,
  SettingsController.updateSetting
);

protectedRouter.put(
  "/settings/email",
  authMiddleware,
  SettingsController.updateEmail
);

//SLIDER
protectedRouter.post("/slider", authMiddleware, SliderController.createSlider);
protectedRouter.get("/slider", authMiddleware, SliderController.getSliders);
protectedRouter.get(
  "/slider/published",
  authMiddleware,
  SliderController.getPublishedSliders
);

protectedRouter.put(
  "/slider/:sliderId/item/:itemId",
  authMiddleware,
  SliderController.updateSliderItem
);
protectedRouter.delete(
  "/slider/:sliderId/item/:itemId",
  authMiddleware,
  SliderController.deleteSliderItem
);
protectedRouter.post(
  "/slider/:sliderId/item",
  authMiddleware,
  SliderController.createSliderItem
);

protectedRouter.get(
  "/slider/:sliderId",
  authMiddleware,
  SliderController.getSliderDetails
);
protectedRouter.put(
  "/slider/:sliderId",
  authMiddleware,
  SliderController.updateSlider
);
protectedRouter.delete(
  "/slider/:sliderId",
  authMiddleware,
  SliderController.deleteSlider
);
//NEWSLETTER

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

//LANGUAGES
protectedRouter.post("/lang", authMiddleware, LangController.addLang);
protectedRouter.get("/lang", authMiddleware, LangController.getLang);
protectedRouter.delete(
  "/lang/:langId",
  authMiddleware,
  LangController.deleteLang
);
protectedRouter.get(
  "/lang/locales",
  authMiddleware,
  LangController.getAllLocale
);
protectedRouter.get(
  "/lang/locale/:langId",
  authMiddleware,
  LangController.getLocaleById
);
protectedRouter.post(
  "/lang/locale/:langId",
  authMiddleware,
  LangController.updateLocale
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

//PAYMENT_METHODS
protectedRouter.post(
  "/paymentMethod",
  authMiddleware,
  PaymentMethodController.createPayment
);
protectedRouter.get(
  "/paymentMethod",
  authMiddleware,
  PaymentMethodController.getAllPayments
);
protectedRouter.get(
  "/paymentMethod/activated",
  authMiddleware,
  PaymentMethodController.getAllActivatedPayments
);

// protectedRouter.get(

//   "/contact/published",
//   authMiddleware,
//   ContactController.getPublishedcontact
// );

protectedRouter.put(
  "/paymentMethod/:paymentId",
  authMiddleware,
  PaymentMethodController.updatePayment
);

protectedRouter.post(
  "/paymentMethod/:paymentId/activate",
  authMiddleware,
  PaymentMethodController.activatePayment
);

protectedRouter.post(
  "/paymentMethod/:paymentId/deactivate",
  authMiddleware,
  PaymentMethodController.deactivatePayment
);

protectedRouter.post(
  "/paymentMethod/:paymentId/setDefault",
  authMiddleware,
  PaymentMethodController.setDefaultPayment
);

protectedRouter.post(
  "/api/processPayment/",
  authMiddleware,
  async (req, res, next) => {
    const token = req.body.tokenId;
    const email = req.body.email;
    const paymentId = req.body.paymentId;

    let paymentMethod = PaymentMethodController.getPayment(paymentId);

    if (paymentMethod && paymentMethod.name === "Stripe") {
      const stripe = require("stripe")(paymentMethod.key);
      try {
        const create = await stripe.customers.create({
          email: email,
          source: token,
        });
        const charge = await stripe.charges.create({
          amount: 1000,
          currency: "usd",
          customer: customer.id,
        });
        console.log({ create, charge });
        res.json({
          status: "success",
          message: "Payment Processed",
        });
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  }
);

//EMAIL PROVIDER
protectedRouter.post(
  "/emailProvider",
  authMiddleware,
  EmailProviderController.createEmailProvider
);
protectedRouter.get(
  "/emailProvider",
  authMiddleware,
  EmailProviderController.getEmailProviders
);

protectedRouter.put(
  "/emailProvider/:emailProviderId",
  authMiddleware,
  EmailProviderController.updateEmailProvider
);

protectedRouter.post(
  "/emailProvider/:emailProviderId/setDefault",
  authMiddleware,
  EmailProviderController.setDefaultEmailProvider
);

//EMAIL TEMPLATE
protectedRouter.post(
  "/emailTemplate",
  authMiddleware,
  EmailTemplateController.createEmailTemplate
);

protectedRouter.put(
  "/emailTemplate/:emailTemplateId",
  authMiddleware,
  EmailTemplateController.updateEmailBody
);

protectedRouter.get(
  "/emailTemplate/:emailTemplateId",
  authMiddleware,
  EmailTemplateController.getEmailTemplateById
);

protectedRouter.post(
  "/sendEmail",
  authMiddleware,
  EmailTemplateController.sendEmail
);

//User ROLE
protectedRouter.post("/role", authMiddleware, RolesController.createRole);
protectedRouter.get(
  "/role/permissions",
  authMiddleware,
  RolesController.getPermissions
);
protectedRouter.put(
  "/role/:roleId",
  authMiddleware,
  RolesController.updateRole
);

protectedRouter.get("/role", authMiddleware, RolesController.getRoles);
protectedRouter.get(
  "/role/:roleId",
  authMiddleware,
  RolesController.getRoleDetails
);

protectedRouter.delete(
  "/role/:roleId",
  authMiddleware,
  RolesController.deleteRole
);

//Activities
protectedRouter.get(
  "/activities",
  authMiddleware,
  ActivityLogsController.getActvities
);

protectedRouter.delete(
  "/activities/:activityId",
  authMiddleware,
  ActivityLogsController.deleteActivity
);
protectedRouter.delete(
  "/activities",
  authMiddleware,
  ActivityLogsController.deleteAll
);

//Product
protectedRouter.post("/product", authMiddleware, ProductController.create);
protectedRouter.post(
  "/product/:productId/variation",
  authMiddleware,
  ProductController.createVariation
);
protectedRouter.get("/product", authMiddleware, ProductController.get);
protectedRouter.get(
  "/product/:productId/variations",
  authMiddleware,
  ProductController.getVariations
);
protectedRouter.get(
  "/product/published",
  authMiddleware,
  ProductController.getPublished
);
protectedRouter.get(
  "/product/:productId",
  authMiddleware,
  ProductController.getDetails
);
protectedRouter.put(
  "/product/:productId",
  authMiddleware,
  ProductController.update
);
protectedRouter.put(
  "/variation/:variationId",
  authMiddleware,
  ProductController.updateVariation
);

protectedRouter.delete(
  "/variation/:variationId",
  authMiddleware,
  ProductController.deleteVariation
);

//Shipping
protectedRouter.post("/shipping", authMiddleware, ShippingController.create);
protectedRouter.get("/shipping", authMiddleware, ShippingController.get);
protectedRouter.post(
  "/shipping/:shippingId/rule",
  authMiddleware,
  ShippingController.addRule
);
protectedRouter.put(
  "/shipping/:shippingId/rule/:ruleId",
  authMiddleware,
  ShippingController.updateRule
);
protectedRouter.delete(
  "/shipping/:shippingId/rule/:ruleId",
  authMiddleware,
  ShippingController.deleteRule
);
protectedRouter.delete(
  "/shipping/:shippingId",
  authMiddleware,
  ShippingController.deleteModel
);

//FlashSale
protectedRouter.post("/flashSale", authMiddleware, FlashSaleController.create);
protectedRouter.get("/flashSale", authMiddleware, FlashSaleController.get);
protectedRouter.get(
  "/flashSale/published",
  authMiddleware,
  FlashSaleController.getPublished
);
protectedRouter.get(
  "/flashSale/:flashSaleId",
  authMiddleware,
  FlashSaleController.getDetails
);
protectedRouter.post(
  "/flashSale/:flashSaleId/product",
  authMiddleware,
  FlashSaleController.addProduct
);
protectedRouter.put(
  "/flashSale/:flashSaleId",
  authMiddleware,
  FlashSaleController.update
);
protectedRouter.put(
  "/flashSale/:flashSaleId/product",
  authMiddleware,
  FlashSaleController.updateProduct
);
console.log(new Date());
protectedRouter.delete(
  "/flashSale/:flashSaleId/product/:productId",
  authMiddleware,
  FlashSaleController.deleteProduct
);
protectedRouter.delete(
  "/flashSale/:flashSaleId",
  authMiddleware,
  FlashSaleController.deleteModel
);

//Reports
protectedRouter.get(
  "/report/summary",
  authMiddleware,
  ReportController.sendSummary
);
protectedRouter.get(
  "/dashboard/summary",
  authMiddleware,
  ReportController.sendDashboard
);

//Customer
protectedRouter.post("/customer", authMiddleware, CustomerController.create);
protectedRouter.get("/customer", authMiddleware, CustomerController.get);

protectedRouter.get(
  "/customer/:customerId",
  authMiddleware,
  CustomerController.getById
);
protectedRouter.put(
  "/customer/:customerId",
  authMiddleware,
  CustomerController.update
);
protectedRouter.delete(
  "/customer/:customerId",
  authMiddleware,
  CustomerController.deleteModel
);

//Reviews
protectedRouter.post("/reviews", authMiddleware, ReviewController.create);
protectedRouter.get("/reviews", authMiddleware, ReviewController.get);

protectedRouter.get(
  "/product/:productId/reviews",
  authMiddleware,
  ReviewController.getReviewByProduct
);
protectedRouter.get(
  "/myreviews",
  authMiddleware,
  ReviewController.getReviewByCustomer
);
protectedRouter.delete(
  "/reviews/:reviewId",
  authMiddleware,
  ReviewController.deleteModel
);

//Reviews
protectedRouter.post(
  "/socialLogin",
  authMiddleware,
  SocialLoginController.create
);
protectedRouter.get("/socialLogin", authMiddleware, SocialLoginController.get);

protectedRouter.get(
  "/socialLogin/enabled",
  authMiddleware,
  SocialLoginController.getEnabled
);
protectedRouter.post(
  "/socialLogin/add",
  authMiddleware,
  SocialLoginController.addLogin
);

protectedRouter.delete(
  "/socialLogin/remove/:loginId",
  authMiddleware,
  SocialLoginController.removeLogin
);

protectedRouter.post(
  "/socialLogin/update",
  authMiddleware,
  SocialLoginController.updateLogin
);

protectedRouter.post(
  "/socialLogin/:isEnabled",
  authMiddleware,
  SocialLoginController.setEnabled
);

//Discounts
protectedRouter.post("/discount", authMiddleware, DiscountController.create);
protectedRouter.get("/discount", authMiddleware, DiscountController.get);
protectedRouter.get(
  "/discount/:couponCode",
  authMiddleware,
  DiscountController.getByCode
);

protectedRouter.delete(
  "/discount/:discountId",
  authMiddleware,
  DiscountController.deleteModel
);

//Transactions
protectedRouter.post(
  "/transaction",
  authMiddleware,
  TransactionController.create
);
protectedRouter.get("/transaction", authMiddleware, TransactionController.get);
protectedRouter.get(
  "/transaction/:transactionId",
  authMiddleware,
  TransactionController.getDetails
);

protectedRouter.put(
  "/transaction/:transactionId",
  authMiddleware,
  TransactionController.update
);

protectedRouter.delete(
  "/transaction/:transactionId",
  authMiddleware,
  TransactionController.deleteModel
);

//Permalink
protectedRouter.post("/permalink", authMiddleware, PermalinkController.create);
protectedRouter.get("/permalink", authMiddleware, PermalinkController.get);

protectedRouter.put("/permalink", authMiddleware, PermalinkController.update);


//Order
protectedRouter.post(
  "/order",
  authMiddleware,
  OrderController.create
);

protectedRouter.get(
  "/orders",
  authMiddleware,
  OrderController.get
);

protectedRouter.get(
  "/orders/incomplete",
  authMiddleware,
  OrderController.getPendingOrders
);

protectedRouter.get(
  "/orders/customer",
  authMiddleware,
  OrderController.getCustomerOrders
);


export { protectedRouter };
