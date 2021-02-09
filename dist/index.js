"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _publicRoutes = require("./routing/publicRoutes");

var _database = require("./config/database");

var _ErrorHandler = require("./middlewares/ErrorHandler");

var _JwtAuth = require("./middlewares/JwtAuth");

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
(0, _database.connect)();
app.use(_publicRoutes.publicRouter);
app.use(_JwtAuth.authMiddleware);
app.use(_ErrorHandler.errorRoutes);
app.listen(process.env.PORT || 3000, function () {
  console.log("Authentication service started on port 3000");
});