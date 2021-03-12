import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const paymentMethodSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    isKeyRequired: { type: Boolean, required: true },
    key: { type: String },
    secret: { type: String },
    isActivated: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false },
  },
  { strict: "throw" }
);

export default mongoose.model("paymentMethods", paymentMethodSchema);
