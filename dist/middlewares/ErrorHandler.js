"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorRoutes = void 0;

var _express = require("express");

var _JwtAuth = require("./JwtAuth");

var errorRoutes = (0, _express.Router)();
exports.errorRoutes = errorRoutes;
errorRoutes.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
errorRoutes.get("*", function (req, res, next) {
  res.status(404).json({
    message: "Route does not exist"
  });
});