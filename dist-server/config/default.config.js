"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAdmin = createAdmin;

var _uuid = require("uuid");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _models = _interopRequireDefault(require("../models"));

var _common = require("../common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hashSync = _bcryptjs["default"].hashSync;
var Admin = _models["default"].admin;

function createAdmin() {
  var details = {
    unique_id: (0, _uuid.v4)(),
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@example.com",
    password: hashSync("John-Doe-1", 8)
  };
  Admin.findOne({
    where: {
      email: details.email
    }
  }).then(function (admin) {
    if (!admin) {
      Admin.create(details).then(function (res) {
        _common.logger.warn('Added admin defaults');
      })["catch"](function (err) {
        _common.logger.error('Error adding admin defaults');
      });
    }
  })["catch"](function (err) {
    _common.logger.error('Error getting default admin');
  });
}