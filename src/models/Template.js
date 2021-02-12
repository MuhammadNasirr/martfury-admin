import mongoose from "../config/database";

const templateSchema = mongoose.Schema(
  {
    name: String,
    header: String,
    footer: String,
  },
  { strict: "throw" }
);

export default mongoose.model("templates", templateSchema);
