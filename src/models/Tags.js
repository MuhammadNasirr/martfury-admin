import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);

const tagSchema = mongoose.Schema(
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
tagSchema.plugin(AutoIncrement, { id: "id_seq1", inc_field: "id" });

export default mongoose.model("tags", tagSchema);
