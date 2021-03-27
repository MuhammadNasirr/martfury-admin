import Customer from "../models/Customer";
import Product from "../models/Product";

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
