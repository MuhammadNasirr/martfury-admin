import mongoose from "../config/database";
var AutoIncrement = require("mongoose-sequence")(mongoose);
import idValid from "mongoose-id-validator";
import bcrypt from "bcrypt";

const customerSchema = mongoose.Schema(
  {
    id: Number,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    createdAt: Date,
  },

  { strict: "throw" }
);
customerSchema.plugin(AutoIncrement, {
  id: "customer_seq",
  inc_field: "id",
});
customerSchema.plugin(idValid);

customerSchema.pre("save", function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    console.log("error is modified");
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

customerSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

export default mongoose.model("customer", customerSchema);
