"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _key = require("../key");

var authMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("authMD");

            if (req.headers.authorization) {
              _context.next = 4;
              break;
            }

            res.status(403).json({
              message: "No token."
            });
            return _context.abrupt("return");

          case 4:
            token = req.headers.authorization.split(" ")[1];
            _context.prev = 5;
            req.jwtPayload = (0, _key.verifyUser)(token);
            _context.next = 14;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](5);
            console.log(_context.t0.message);
            res.status(401).json({
              message: _context.t0.message
            });
            return _context.abrupt("return");

          case 14:
            console.log("jwt", req.jwtPayload);
            _context.next = 17;
            return next();

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 9]]);
  }));

  return function authMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.authMiddleware = authMiddleware;