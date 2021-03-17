import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const mediaSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    path: { type: String, required: true },
    softDelete: { type: Boolean, default: false },
    createdAt: Date,
    modifiedAt: Date,
  },

  { strict: "throw" }
);

export default mongoose.model("media", mediaSchema);
