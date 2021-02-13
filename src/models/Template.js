import mongoose from "../config/database";

const templateSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    header: { type: String, required: true },
    footer: { type: String, required: true },
  },
  { strict: "throw" }
);

export default mongoose.model("templates", templateSchema);
