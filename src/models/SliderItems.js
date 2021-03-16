import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const sliderItemSchema = mongoose.Schema(
  {
    id: Number,
    title: { type: String, required: true },
    order: { type: Number, required: true },
    createdAt: Date,
    link: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
  },
  { strict: "throw" }
);

sliderItemSchema.plugin(AutoIncrement, {
  id: "sliderItems_seq",
  inc_field: "id",
});
sliderItemSchema.plugin(idValid);

export default mongoose.model("sliderItems", sliderItemSchema);
