import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const productVariantSchema = mongoose.Schema(
  {
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
      message: 'Allowed Values : "In Stock", "Out of Stock", "On Backorder"',
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
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    softDelete: { type: Boolean, default: false },
  },
  { strict: "throw" }
);
productVariantSchema.plugin(idValid, {
  message: "Bad ID value for {PATH}",
});
productVariantSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.softDelete;
  return obj;
};
export default mongoose.model("products_variant", productVariantSchema);
