import mongoose from "../config/database";
import bcrypt from "bcrypt";
const salt = 10;
const userSchema = mongoose.Schema(
  {
    name: String,
    userId: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ["Admin", "User"], required: true },
  },
  { strict: "throw" }
);

userSchema.pre("save", function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    console.log("error is modified");
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

export default mongoose.model("users", userSchema);
