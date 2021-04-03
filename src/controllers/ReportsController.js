import Customer from "../models/Customer";
import Page from "../models/Page";
import Plugins from "../models/Plugins";
import Posts from "../models/Posts";
import Product from "../models/Product";
import Review from "../models/Review";
import User from "../models/User";

export const sendSummary = async (req, res, next) => {
  let productCount = await Product.countDocuments();
  let customerCount = await Customer.countDocuments();
  let orderCount = 0;
  let revenue = 0;
  res.status(200).json({
    productCount,
    customerCount,
    orderCount,
    revenue,
  });
  next();
};

export const sendDashboard = async (req, res, next) => {
  let productCount = await Product.countDocuments();
  let customerCount = await Customer.countDocuments();
  let reviewCount = await Review.countDocuments();
  let posts = await Posts.find()
    .limit(10)
    .sort({ createdAt: -1 })
    .select("id name createdAt");
  let orderCount = 0;
  let pageCount = await Page.countDocuments();
  let pluginCount = await Plugins.countDocuments();
  let themeCount = 0;
  let userCount = await User.countDocuments();

  res.status(200).json({
    productCount,
    customerCount,
    reviewCount,
    orderCount,
    posts,
    pageCount,
    pluginCount,
    themeCount,
    userCount,
  });
  next();
};
