"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminRules = void 0;

var _expressValidator = require("express-validator");

var _auth = require("../config/auth.config");

var adminRules = {
  forFindingAdmin: [(0, _expressValidator.check)('unique_id').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Unique Id is required")],
  forAdding: [(0, _expressValidator.check)('firstname').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Firstname is required"), (0, _expressValidator.check)('firstname').isLength({
    min: 3,
    max: 50
  }).withMessage("Invalid length (3 - 50) characters"), (0, _expressValidator.check)('lastname').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Lastname is required"), (0, _expressValidator.check)('lastname').isLength({
    min: 3,
    max: 50
  }).withMessage("Invalid length (3 - 50) characters"), (0, _expressValidator.check)('email').isEmail().withMessage('Invalid email format'), (0, _expressValidator.check)('password').isString().isStrongPassword(_auth.password_options).withMessage('Invalid password (must be 8 characters or more and contain one or more uppercase, lowercase, number and special character)'), (0, _expressValidator.check)('confirmPassword').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Confirm Password is required"), (0, _expressValidator.check)('confirmPassword').custom(function (confirmPassword, _ref) {
    var req = _ref.req;
    return req.body.password === confirmPassword;
  }).withMessage('Passwords are different')],
  forLogin: [(0, _expressValidator.check)('email').isEmail().withMessage('Invalid email format'), (0, _expressValidator.check)('password').exists().withMessage("Password is required")],
  forUpdating: [(0, _expressValidator.check)('unique_id').exists().withMessage("Unique Id is required"), (0, _expressValidator.check)('firstname').exists().withMessage("Firstname is required"), (0, _expressValidator.check)('firstname').isLength({
    min: 3,
    max: 50
  }).withMessage("Invalid length (3 - 50) characters"), (0, _expressValidator.check)('lastname').exists().withMessage("Lastname is required"), (0, _expressValidator.check)('lastname').isLength({
    min: 3,
    max: 50
  }).withMessage("Invalid length (3 - 50) characters")]
};
exports.adminRules = adminRules;