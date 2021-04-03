import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const permalinkSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    link: String,
  },

  { strict: "throw" }
);
permalinkSchema.plugin(AutoIncrement, {
  id: "permalink_seq",
  inc_field: "id",
});
permalinkSchema.plugin(idValid);

export default mongoose.model("permalink", permalinkSchema);
