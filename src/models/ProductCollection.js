import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const productCollectionSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: new Date() },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    isFeatured: { type: Boolean, default: false },
  },

  { strict: "throw" }
);
productCollectionSchema.plugin(AutoIncrement, {
  id: "product_collection_seq",
  inc_field: "id",
});
productCollectionSchema.plugin(idValid);

export default mongoose.model("productCollection", productCollectionSchema);
