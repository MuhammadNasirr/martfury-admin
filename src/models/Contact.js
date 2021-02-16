import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";

const contactSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: Date,
    status: {
      type: String,
      enum: ["Read", "Unread"],
      required: true,
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    content: { type: String, required: true },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    replies: [
      {
        createdAt: Date,
        content: { type: String, required: true },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
  },
  { strict: "throw" }
);
contactSchema.plugin(AutoIncrement, { id: "contact_seq", inc_field: "id" });
contactSchema.plugin(idValid);

contactSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.softDelete;
  return obj;
};
export default mongoose.model("contact", contactSchema);
