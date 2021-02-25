import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const productAttributeSchema = mongoose.Schema(
  {
    id: Number,
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    layout: {
      type: String,
      enum: ["Dropdown Swatch", "Visual Swatch", "Text Swatch"],
      required: true,
    },
    searchable: { type: Boolean, default: false },
    comparable: { type: Boolean, default: false },
    usedProductListing: { type: Boolean, default: false },
    createdAt: Date,

    slug: { type: String, required: true },
    attributesList: [
      {
        title: { type: String, required: true },
        slug: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
        color: { type: String, default: "#000000" },
        image: String,
      },
    ],
    order: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { strict: "throw" }
);
productAttributeSchema.plugin(AutoIncrement, {
  id: "productAttribute_seq",
  inc_field: "id",
});

productAttributeSchema.plugin(idValid);
export default mongoose.model("productAttribute", productAttributeSchema);
