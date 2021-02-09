"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUser = exports.signUser = exports.privateKey = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var privateKey = _fs["default"].readFileSync("src/key/PrivateKey.pem");

exports.privateKey = privateKey;

var signUser = function signUser(userid) {
  return _jsonwebtoken["default"].sign({
    userid: userid
  }, privateKey);
};

exports.signUser = signUser;

var verifyUser = function verifyUser(token) {
  return _jsonwebtoken["default"].verify(token, privateKey);
};

exports.verifyUser = verifyUser;