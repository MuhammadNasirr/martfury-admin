import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const shippingSchema = mongoose.Schema(
  {
    country: { type: String, required: true },
    rules: [
      {
        name: { type: String, required: true },
        type: { type: String, enum: ["price", "weight"], required: true },
        from: { type: Number, default: 0 },
        to: { type: Number, required: true },
        shippingFee: { type: Number, default: 0 },
      },
    ],
  },

  { strict: "throw" }
);

export default mongoose.model("shipping", shippingSchema);
