import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const taxSchema = mongoose.Schema(
  {
    id: Number,
    title: { type: String, required: true },
    taxPercent: { type: Number, required: true },
    priority: { type: Number, required: true },
    createdAt: { type: Date, default: new Date() },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
  },

  { strict: "throw" }
);
taxSchema.plugin(AutoIncrement, { id: "tax_seq", inc_field: "id" });
taxSchema.plugin(idValid);

export default mongoose.model("tax", taxSchema);
