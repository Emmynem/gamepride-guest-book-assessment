"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _middleware = _interopRequireDefault(require("../middleware"));

var _admin = require("../controllers/admin.controller");

var _admin2 = require("../rules/admin.rules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token");
    next();
  }); // Admin routes -----

  app.get("/api/backoffice/admins", [_middleware["default"].verifyToken, _middleware["default"].isAdmin], _admin.getAdmins);
  app.get("/api/backoffice/admin", [_middleware["default"].verifyToken, _middleware["default"].isAdmin, _admin2.adminRules.forFindingAdmin], _admin.getAdmin);
  app.post("/api/backoffice/admin", [_middleware["default"].verifyToken, _middleware["default"].isAdmin, _admin2.adminRules.forAdding], _admin.addAdmin);
  app.put("/api/backoffice/admin", [_middleware["default"].verifyToken, _middleware["default"].isAdmin, _admin2.adminRules.forUpdating], _admin.updateAdmin);
  app["delete"]("/api/backoffice/admin", [_middleware["default"].verifyToken, _middleware["default"].isAdmin, _admin2.adminRules.forFindingAdmin], _admin.removeAdmin);
}

;