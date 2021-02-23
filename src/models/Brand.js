import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const brandSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    createdAt: Date,

    isFeatured: { type: Boolean, default: false },

    description: { type: String, required: false },
    logo: String,
    order: Number,
    website: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { strict: "throw" }
);
brandSchema.plugin(AutoIncrement, {
  id: "brand_seq",
  inc_field: "id",
});

brandSchema.plugin(idValid);
export default mongoose.model("brand", brandSchema);
