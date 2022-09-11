"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _middleware = _interopRequireDefault(require("../middleware"));

var _guests = require("../controllers/guests.controller");

var _guest = require("../rules/guest.rules");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token");
    next();
  }); // Guest routes -----

  app.get("/api/guests/", [_middleware["default"].verifyToken, _middleware["default"].isAdmin], _guests.getGuests);
  app.get("/api/guest/", [_middleware["default"].verifyToken, _middleware["default"].isAdmin, _guest.guestRules.forFindingGuest], _guests.getGuest);
  app["delete"]("/api/guest/", [_middleware["default"].verifyToken, _middleware["default"].isAdmin, _guest.guestRules.forFindingGuest], _guests.removeGuest);
}

;