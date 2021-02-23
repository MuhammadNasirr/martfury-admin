import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const productCategorySchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    createdAt: Date,
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productCategory",
      default: null,
    },
    isFeatured: { type: Boolean, default: false },
    iconName: String,
    description: { type: String, required: false },
    image: String,
    order: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { strict: "throw" }
);
productCategorySchema.plugin(AutoIncrement, {
  id: "productCategory_seq",
  inc_field: "id",
});

productCategorySchema.plugin(idValid);
export default mongoose.model("productCategory", productCategorySchema);
