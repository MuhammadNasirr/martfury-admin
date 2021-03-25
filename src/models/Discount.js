import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const discountSchema = mongoose.Schema(
  {
    id: Number,
    code: { type: String, required: true },
    type: {
      type: String,
      enum: ["Coupon Code", "Promotion"],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    willExpire: { type: Boolean, default: true },
    limit: { type: Number, default: 0 },
    useWithPromotion: { type: Boolean, default: false },
    couponType: {
      type: String,
      enum: ["Price", "Discount %", "Shipping", "Same Price"],

      required: true,
    },
    discount: { type: Number, default: 0 },
    applyOn: { type: String },
    noOfProducts: { type: Number, default: 0 },
  },

  { strict: "throw" }
);
discountSchema.plugin(AutoIncrement, {
  id: "discount_seq",
  inc_field: "id",
});
discountSchema.plugin(idValid);

export default mongoose.model("discount", discountSchema);
