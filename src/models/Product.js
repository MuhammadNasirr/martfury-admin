import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const productSchema = mongoose.Schema(
  {
    id: Number,

    name: { type: String, required: true },
    description: { type: String },
    content: String,
    images: [String],
    sku: String,
    price: Number,
    salePrice: Number,
    discountDate: {
      from: Date,
      to: Date,
    },
    inStore: { type: Boolean, default: false },
    quantity: { type: Number, default: 0 },
    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock", "On Backorder"],
      default: "In Stock",
    },
    allowCheckout: { type: Boolean, default: false },
    shipping: {
      weight: { type: Number }, //in gram
      length: { type: Number }, //in cm
      wide: Number, //in cm
      height: Number, //in cm
    },
    attributes: [
      {
        attributeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productAttribute",
          required: true,
        },
        value: String,
      },
    ],
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    order: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productCategory",
        required: true,
      },
    ],

    tags: [
      {
        tagId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productTags",
        },
        value: String,
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
    },
    productCollection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productCollection",
      },
    ],
    tax: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tax",
    },
    createdAt: Date,

    softDelete: { type: Boolean, default: false },
  },
  { strict: "throw" }
);
productSchema.plugin(AutoIncrement, { id: "product_seq", inc_field: "id" });
productSchema.plugin(idValid);
productSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.softDelete;
  return obj;
};
export default mongoose.model("products", productSchema);
