import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const transactionSchema = mongoose.Schema(
  {
    id: Number,

    chargeId: { type: String },
    createdAt: { type: Date, default: new Date() },
    status: {
      type: String,
      enum: ["Completed", "Refunding", "Refunded", "Fraud", "Failed"],

      required: true,
    },
    paymentChannel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "paymentMethods",
    },
    total: { type: Number },
  },

  { strict: "throw" }
);
transactionSchema.plugin(AutoIncrement, {
  id: "transaction_seq",
  inc_field: "id",
});
transactionSchema.plugin(idValid);

export default mongoose.model("transaction", transactionSchema);
