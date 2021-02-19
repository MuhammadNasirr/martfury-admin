import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);

const newsletterSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    status: {
      type: String,
      enum: ["Subscribed", "Unsubscribed"],
      required: true,
    },

    createdAt: Date,
    email: { type: String, required: true, unique: true },
  },

  { strict: "throw" }
);
newsletterSchema.plugin(AutoIncrement, {
  id: "newsletter_seq",
  inc_field: "id",
});

export default mongoose.model("newsletter", newsletterSchema);
