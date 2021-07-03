import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const orderSchema = mongoose.Schema(
  {
    id: Number,
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    totalAmount: { type: Number, required: true },
    subAmount: { type: Number, required: true },
    tax: { type: Number },
    shippingAmount: { type: Number },
    paymentMethod: {
      type: String,
      enum: ["Cash On Delivery (COD)", "Bank Transfer"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      required: true,
    },
    shippingStatus: {
      type: String,
      enum: ["Picking", "Delivering", "Delivered", "Not delivered", "Canceled"],
    },
    createdAt: { type: Date, default: new Date() },
    product: [
      {
        productDetail: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
        price: Number,
        variantId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "products_variant",
        }
      },
    ],
    discount: Number,
    shippingFee: Number,
    note: String,
  },

  { strict: "throw" }
);
orderSchema.plugin(AutoIncrement, {
  id: "order_seq",
  inc_field: "id",
});
orderSchema.plugin(idValid);

export default mongoose.model("orders", orderSchema);
