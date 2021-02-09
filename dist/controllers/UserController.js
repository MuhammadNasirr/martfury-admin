"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = exports.login = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var userRepo = _interopRequireWildcard(require("../repository/UserRepository"));

var _index = require("../key/index");

var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, userId, password, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, userId = _req$body.userId, password = _req$body.password;

            if (!(userId && password)) {
              _context.next = 9;
              break;
            }

            _context.next = 4;
            return userRepo.getUser({
              userId: userId,
              password: password
            });

          case 4:
            user = _context.sent;
            console.log(user);

            if (user.error) {
              res.status(401).json({
                error: user.error
              });
            } else {
              res.status(200).json({
                _id: user.id,
                token: (0, _index.signUser)(user.id),
                userId: user.email,
                name: user.name
              });
            }

            _context.next = 10;
            break;

          case 9:
            res.status(400).json({
              message: "UserId or Password missing"
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.login = login;

var signup = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body2, name, userId, password, user;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, userId = _req$body2.userId, password = _req$body2.password;
            console.log(req.body);

            if (!(userId && password)) {
              _context2.next = 12;
              break;
            }

            _context2.next = 5;
            return userRepo.createUser({
              name: name,
              userId: userId,
              password: password
            });

          case 5:
            user = _context2.sent;

            if (!user.error) {
              _context2.next = 9;
              break;
            }

            res.status(401).json({
              error: user.error
            });
            return _context2.abrupt("return");

          case 9:
            res.status(200).json({
              _id: user.id,
              token: (0, _index.signUser)(user.id),
              userId: user.userId,
              name: user.name
            });
            _context2.next = 13;
            break;

          case 12:
            res.status(400).json({
              message: "UserId or Password missing"
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signup(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signup = signup;