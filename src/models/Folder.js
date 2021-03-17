import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const folderSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "folders" },
    media: [{ type: mongoose.Schema.Types.ObjectId, ref: "media" }],
    createdAt: Date,
    modifiedAt: Date,
    softDelete: { type: Boolean, default: false },
  },

  { strict: "throw" }
);
folderSchema.plugin(idValid);

export default mongoose.model("folders", folderSchema);
