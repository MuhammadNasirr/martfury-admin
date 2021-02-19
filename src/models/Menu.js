import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const menuSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    createdAt: Date,

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    structure: Object,
    displayLocation: [{ type: String, enum: ["Main", "Header", "Footer"] }],
  },

  { strict: "throw" }
);
menuSchema.plugin(AutoIncrement, { id: "id_seq5", inc_field: "id" });
menuSchema.plugin(idValid);

export default mongoose.model("menus", menuSchema);
