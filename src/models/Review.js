import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const reviewSchema = mongoose.Schema(
  {
    id: Number,
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    stars: { type: Number, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: new Date() },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
  },

  { strict: "throw" }
);
reviewSchema.plugin(AutoIncrement, {
  id: "review_seq",
  inc_field: "id",
});
reviewSchema.plugin(idValid);

export default mongoose.model("review", reviewSchema);
