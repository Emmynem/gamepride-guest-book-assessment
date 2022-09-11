"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGuest = getGuest;
exports.getGuests = getGuests;
exports.removeGuest = removeGuest;

var _expressValidator = require("express-validator");

var _common = require("../common");

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Guest = _models["default"].guest;

function getGuests(req, res) {
  Guest.findAndCountAll({
    attributes: {
      exclude: ['updatedAt', 'id']
    },
    order: [['createdAt', 'DESC']]
  }).then(function (guests) {
    if (!guests || guests.length == 0) {
      (0, _common.SuccessResponse)(res, "Guests Not found", []);
    } else {
      (0, _common.SuccessResponse)(res, "Guests loaded", guests);
    }
  })["catch"](function (err) {
    (0, _common.ServerError)(res, err.message, null);
  });
}

;

function getGuest(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    (0, _common.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Guest.findOne({
      attributes: {
        exclude: ['id']
      },
      where: _objectSpread({}, payload)
    }).then(function (admin) {
      if (!admin) {
        (0, _common.NotFoundError)(res, "Guest not found", null);
      } else {
        (0, _common.SuccessResponse)(res, "Guest loaded", admin);
      }
    })["catch"](function (err) {
      (0, _common.ServerError)(res, err.message, null);
    });
  }
}

;

function removeGuest(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    (0, _common.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Guest.destroy({
      where: _objectSpread({}, payload)
    }).then(function (data) {
      if (!data) {
        (0, _common.NotFoundError)(res, "Guest not found", null);
      } else {
        (0, _common.OtherSuccessResponse)(res, "Guest details deleted successfully!");
      }
    })["catch"](function (err) {
      (0, _common.ServerError)(res, err.message, null);
    });
  }
}

;