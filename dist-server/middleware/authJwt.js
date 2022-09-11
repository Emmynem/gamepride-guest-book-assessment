"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = require("../config/auth.config");

var _common = require("../common");

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verify = _jsonwebtoken["default"].verify;
var Admin = _models["default"].admin;

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"] || req.query.token || req.body.token || '';

  if (!token) {
    (0, _common.ForbiddenError)(res, "No token provided!", null);
  } else {
    verify(token, _auth.secret, function (err, decoded) {
      if (err) {
        (0, _common.UnauthorizedError)(res, "Unauthorized!", null);
      } else {
        req.UNIQUE_ID = decoded.unique_id;
        next();
      }
    });
  }
};

var isAdmin = function isAdmin(req, res, next) {
  Admin.findOne({
    where: {
      unique_id: req.UNIQUE_ID
    }
  }).then(function (admin) {
    if (!admin) {
      (0, _common.ForbiddenError)(res, "Require Admin!", null);
    } else {
      next();
    }
  });
};

var authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin
};
var _default = authJwt;
exports["default"] = _default;