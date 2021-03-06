import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const pageSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true, unique: true },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "templates",
      required: true,
    },
    createdAt: Date,
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    content: { type: String, required: true },
    softDelete: { type: Boolean, default: false },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { strict: "throw" }
);
pageSchema.plugin(AutoIncrement, { id: "id_seq", inc_field: "id" });
pageSchema.plugin(idValid);

pageSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.softDelete;
  return obj;
};
export default mongoose.model("page", pageSchema);
