import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const postSchema = mongoose.Schema(
  {
    id: Number,
    image: String,
    name: { type: String, required: true },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
      },
    ],

    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tags",
      },
    ],
    createdAt: Date,
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    format: {
      type: String,
      enum: ["Default", "Gallery", "Video"],
      required: true,
    },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    softDelete: { type: Boolean, default: false },
  },
  { strict: "throw" }
);
postSchema.plugin(AutoIncrement, { id: "id_seq4", inc_field: "id" });
postSchema.plugin(idValid);
postSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.softDelete;
  return obj;
};
export default mongoose.model("posts", postSchema);
