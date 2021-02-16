import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const faqCategorySchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    createdAt: Date,
    order: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { strict: "throw" }
);
faqCategorySchema.plugin(AutoIncrement, {
  id: "faqCategory_seq",
  inc_field: "id",
});

faqCategorySchema.plugin(idValid);
export default mongoose.model("faqCategory", faqCategorySchema);
