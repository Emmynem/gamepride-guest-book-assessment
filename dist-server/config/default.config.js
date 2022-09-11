"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAdmin = createAdmin;

var _uuid = require("uuid");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hashSync = _bcryptjs["default"].hashSync;
var Admin = _models["default"].admin;

function createAdmin(dropAndResync) {
  var details = {
    unique_id: (0, _uuid.v4)(),
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
    password: hashSync("John-Doe-1", 8)
  };

  if (dropAndResync) {
    Admin.create(details).then(function (res) {
      return true;
    })["catch"](function (err) {
      return false;
    });
  }
}