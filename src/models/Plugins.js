import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const pluginSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    activated: { type: Boolean, default: true },
    softDelete: { type: Boolean, default: false },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { strict: "throw" }
);

pluginSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.softDelete;
  return obj;
};
export default mongoose.model("plugins", pluginSchema);
