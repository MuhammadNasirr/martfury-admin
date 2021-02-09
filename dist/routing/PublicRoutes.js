"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicRouter = void 0;

var _express = require("express");

var UserController = _interopRequireWildcard(require("../controllers/UserController"));

var publicRouter = (0, _express.Router)();
exports.publicRouter = publicRouter;
publicRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
publicRouter.post("/auth/login", UserController.login);
publicRouter.post("/auth/signup", UserController.signup);
publicRouter.get("*", function (req, res, next) {
  res.status(404).json({
    message: "Route does not exist"
  });
}); // define the about route