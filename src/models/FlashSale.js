import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const flashSaleSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },

    createdAt: { type: Date, default: new Date() },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    endDate: { type: Date, required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        flashSalePrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },

  { strict: "throw" }
);
flashSaleSchema.plugin(AutoIncrement, {
  id: "flash_sale_seq",
  inc_field: "id",
});
flashSaleSchema.plugin(idValid);

export default mongoose.model("flashSale", flashSaleSchema);
