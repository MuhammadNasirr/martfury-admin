"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

_mongoose["default"].Promise = global.Promise;
var mongoURI = "mongodb+srv://test:test1234@cluster0.13uvc.mongodb.net/server?retryWrites=true&w=majority";

var connect = function connect() {
  _mongoose["default"].connect( //"mongodb://127.0.0.1/ADAM",
  mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(function () {
    console.log("connected");
  }, function (err) {
    console.log("some error occured", err);
  });
};

exports.connect = connect;
var _default = _mongoose["default"];
exports["default"] = _default;