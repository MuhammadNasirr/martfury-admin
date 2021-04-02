import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const settingsSchema = mongoose.Schema(
  {
    id: { type: Number, default: 1, unique: true },
    general: {
      siteTitle: String,
      tagline: String,
      siteAddress: String,
      blogAddress: String,
      membership: String,
      adminEmail: String,
      timezone: String,
      dateFormat: String,
      timeFormat: String,
      adminEmail: { type: String, required: true },
      timezone: { type: String, required: true },
    },
    adminAppearance: {
      logo: { type: String },
      favIcon: { type: String },
      loginBackground: [{ type: String }],
      title: String,
      editor: { type: String, enum: ["CkEditor", "TinyMCE"], required: true },
      theme: String,
      changeTheme: { type: Boolean, default: false },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },

  { strict: "throw" }
);

export default mongoose.model("settings", settingsSchema);
