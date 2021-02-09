"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user"));

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
    var newUser, user, userData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findOne({
              userId: payload.userId
            });

          case 2:
            user = _context.sent;
            console.log(user);

            if (!user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", {
              error: "UserId Already Exists"
            });

          case 6:
            if (user) {
              _context.next = 12;
              break;
            }

            newUser = new _user["default"](payload);
            _context.next = 10;
            return newUser.save();

          case 10:
            userData = _context.sent;
            return _context.abrupt("return", {
              userId: userData.userId,
              name: userData.name,
              password: userData.password
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(payload) {
    var user, isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              userId: payload.userId
            });

          case 2:
            user = _context2.sent;
            console.log(user);

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", {
              error: "User Doesnot Exist"
            });

          case 6:
            if (!user) {
              _context2.next = 13;
              break;
            }

            isMatch = user.comparePassword(payload.password, function (error, match) {
              console.log(match);

              if (!match) {
                return {
                  error: "The password is invalid"
                };
              }
            });

            if (isMatch) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", {
              id: user._id,
              userId: user.userId,
              name: user.name
            });

          case 12:
            return _context2.abrupt("return", {
              error: "invalid username and password pair"
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUser(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUser = getUser;