import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const faqSchema = mongoose.Schema(
  {
    id: Number,

    question: { type: String, required: true },

    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "faqCategory",
      required: true,
    },

    createdAt: Date,
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },

    answer: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { strict: "throw" }
);
faqSchema.plugin(AutoIncrement, { id: "faq_seq", inc_field: "id" });
faqSchema.plugin(idValid);
export default mongoose.model("faq", faqSchema);
