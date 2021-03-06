import mongoose from "../config/database";
import bcrypt from "bcrypt";
const salt = 10;
const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    userId: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    status: {
      type: String,
      enum: ["Activated", "Deactivated"],
      required: true,
    },
    isSuper: { type: Boolean, default: false },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userRoles",
    },
    softDelete: { type: Boolean, default: false },
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
