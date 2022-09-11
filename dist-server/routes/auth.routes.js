"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _auth = require("../controllers/auth.controller");

var _admin = require("../rules/admin.rules");

var _guest = require("../rules/guest.rules");

function _default(app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token");
    next();
  }); // Auth routes -----

  app.post("/api/auth/backoffice/signin", [_admin.adminRules.forLogin], _auth.adminSignin);
  app.post("/api/guest/signup", [_guest.guestRules.forSignUp], _auth.guestSignUp);
}

;