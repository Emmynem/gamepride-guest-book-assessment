"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminSignin = adminSignin;
exports.guestSignUp = guestSignUp;

var _expressValidator = require("express-validator");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _uuid = require("uuid");

var _common = require("../common");

var _models = _interopRequireDefault(require("../models"));

var _auth = require("../config/auth.config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var compareSync = _bcryptjs["default"].compareSync;
var sign = _jsonwebtoken["default"].sign;
var Admin = _models["default"].admin;
var Guest = _models["default"].guest;

function adminSignin(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    (0, _common.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Admin.findOne({
      where: {
        email: payload.email
      }
    }).then(function (admin) {
      if (!admin) {
        (0, _common.NotFoundError)(res, "Admin not found", null);
      } else {
        var passwordIsValid = compareSync(payload.password, admin.password);

        if (!passwordIsValid) {
          (0, _common.UnauthorizedError)(res, "Invalid Password!", null);
        } else {
          var token = sign({
            unique_id: admin.unique_id
          }, _auth.secret, {
            expiresIn: 86400 // 24 hours

          });
          (0, _common.SuccessResponse)(res, "Logged in successfully!", {
            token: token
          });
        }
      }
    })["catch"](function (err) {
      (0, _common.ServerError)(res, err.message, null);
    });
  }
}

function guestSignUp(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    (0, _common.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Guest.create(_objectSpread(_objectSpread({}, payload), {}, {
      unique_id: (0, _uuid.v4)()
    })).then(function (guest) {
      var data = {
        unique_id: guest.unique_id,
        fullname: guest.firstname + (guest.middlename !== null ? " " + guest.middlename + " " : " ") + guest.lastname,
        check_in: payload.check_in
      };
      (0, _common.CreationSuccessResponse)(res, "Guest registered successfully!", data);
    })["catch"](function (err) {
      (0, _common.ServerError)(res, err.message, null);
    });
  }
}