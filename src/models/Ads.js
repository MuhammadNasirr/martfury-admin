import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const adsSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    image: String,
    createdAt: Date,
    expiredAt: Date,
    shortCode: String,
    key: { type: String, required: true, unique: true },
    clicked: Number,
    url: { type: String, required: true },
    order: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    location: { type: String },
  },

  { strict: "throw" }
);
adsSchema.plugin(AutoIncrement, { id: "ads_seq", inc_field: "id" });
adsSchema.plugin(idValid);

export default mongoose.model("ads", adsSchema);
