import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const productTagSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    createdAt: Date,
    description: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { strict: "throw" }
);
productTagSchema.plugin(AutoIncrement, {
  id: "productTag_seq",
  inc_field: "id",
});
productTagSchema.plugin(idValid);
productTagSchema.index({
  id: 1,
});
productTagSchema.index({
  name: "text",
});

export default mongoose.model("productTags", productTagSchema);
