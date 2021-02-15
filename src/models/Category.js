import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);

const categorySchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Published", "Pending", "Draft"],
      required: true,
    },
    createdAt: Date,
    updatedAt: Date,
    description: { type: String, required: false },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      default: null,
    },
    isDefault: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    iconName: String,
    Order: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { strict: "throw" }
);
categorySchema.plugin(AutoIncrement, { id: "id_seq2", inc_field: "id" });

export default mongoose.model("categories", categorySchema);
