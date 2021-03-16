import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const sliderSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },

    createdAt: Date,
    key: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    sliderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "sliderItems" }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { strict: "throw" }
);

sliderSchema.plugin(AutoIncrement, { id: "slider_seq", inc_field: "id" });

sliderSchema.plugin(idValid);

export default mongoose.model("slider", sliderSchema);
