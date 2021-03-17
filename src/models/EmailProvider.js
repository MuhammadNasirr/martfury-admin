import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const emailProviderSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    endpoint: { type: String, required: true },
    isKeyRequired: { type: Boolean, required: true },
    key: { type: String },
    secret: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { strict: "throw" }
);

export default mongoose.model("emailProviders", emailProviderSchema);
