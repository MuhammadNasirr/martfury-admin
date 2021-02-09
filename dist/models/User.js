"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _database = _interopRequireDefault(require("../config/database"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var salt = 10;

var userSchema = _database["default"].Schema({
  name: String,
  userId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    console.log("error is modified");
    return next();
  }

  this.password = _bcrypt["default"].hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, _bcrypt["default"].compareSync(plaintext, this.password));
};

var _default = _database["default"].model("users", userSchema);

exports["default"] = _default;