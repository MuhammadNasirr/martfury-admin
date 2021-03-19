import mongooseIdValidator from "mongoose-id-validator";
import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);

const roleSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    description: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
    permissions: [{ type: String }],
    createdAt: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { strict: "throw" }
);

roleSchema.plugin(AutoIncrement, { id: "role_seq", inc_field: "id" });
roleSchema.plugin(mongooseIdValidator);
export default mongoose.model("userRoles", roleSchema);
