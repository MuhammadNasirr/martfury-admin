import Customer from "../models/Customer";
import Posts from "../models/Posts";
import Product from "../models/Product";
import Review from "../models/Review";

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
  res.status(200).json({
    productCount,
    customerCount,
    reviewCount,
    orderCount,
    posts,
  });
  next();
};
