import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const languageScheme = mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String },
    isDefault: { type: Boolean, default: false },
    data: { type: Object },
  },

  { strict: "throw" }
);

export default mongoose.model("languages", languageScheme);
