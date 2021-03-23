import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const activitySchema = mongoose.Schema(
  {
    id: Number,
    createdAt: { type: Date, default: new Date() },
    createdBy: String,
    action: { type: String },
    userAgent: { type: String },
    ip: { type: String },
  },

  { strict: "throw" }
);
activitySchema.plugin(AutoIncrement, { id: "activity_seq", inc_field: "id" });
activitySchema.plugin(idValid);

export default mongoose.model("activity", activitySchema);
