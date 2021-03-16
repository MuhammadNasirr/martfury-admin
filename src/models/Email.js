import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const emailSchema = mongoose.Schema(
  {
    domain: { type: String, required: true },
    senderName: { type: String, required: true },
    senderEmail: { type: String, required: true },
  },
  { strict: "throw" }
);

export default mongoose.model("emails", emailSchema);
