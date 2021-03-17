import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const emailTemplateSchema = mongoose.Schema(
  {
    template: { type: String, required: true },
    description: { type: String, required: true },
    enabled: { type: Boolean, required: true },
    subject: { type: String },
    slug: { type: String, required: false, unique: true },
    body: { type: String, required: true },
    category: {
      type: String,
      enum: ["Theme", "Templates", "Contact", "Ecommerce", "Newsletter"],
      required: true,
    },
  },
  { strict: "throw" }
);

export default mongoose.model("emailTemplates", emailTemplateSchema);
