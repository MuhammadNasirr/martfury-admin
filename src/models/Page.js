import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
const pageSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    template: { type: String, required: true },
    createdAt: Date,
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    content: { type: String, required: true },
    softDelete: { type: Boolean, default: false },
  },
  { strict: "throw" }
);
pageSchema.plugin(AutoIncrement, { id: "id_seq", inc_field: "id" });
pageSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.softDelete;
  return obj;
};
export default mongoose.model("page", pageSchema);
