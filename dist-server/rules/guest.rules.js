"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guestRules = void 0;

var _expressValidator = require("express-validator");

var validatePhoneNumber = function validatePhoneNumber(phoneNumber) {
  var tester = /^([- +()0-9]{6,15})/;
  if (!phoneNumber) return false;
  if (phoneNumber.length > 15) return false;
  var valid = tester.test(phoneNumber);
  if (!valid) return false;
  return true;
};

var validateDate = function validateDate(date) {
  var d = new Date(date);
  var today = new Date();
  if (d == "Invalid Date") return false;
  if (today.getTime() > d.getTime()) return false;
  return true;
};

var guestRules = {
  forFindingGuest: [(0, _expressValidator.check)('unique_id').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Unique Id is required")],
  forSignUp: [(0, _expressValidator.check)('firstname').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Firstname is required"), (0, _expressValidator.check)('firstname').isLength({
    min: 3,
    max: 50
  }).withMessage("Invalid length (3 - 50) characters"), (0, _expressValidator.check)('middlename').optional({
    checkFalsy: false
  }).isLength({
    min: 3,
    max: 50
  }).withMessage("Invalid length (3 - 50) characters"), (0, _expressValidator.check)('lastname').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Lastname is required"), (0, _expressValidator.check)('lastname').isLength({
    min: 3,
    max: 50
  }).withMessage("Invalid length (3 - 50) characters"), (0, _expressValidator.check)('email').isEmail().withMessage('Invalid email format'), (0, _expressValidator.check)('phone').optional({
    checkFalsy: false
  }).custom(function (phone) {
    return !!validatePhoneNumber(phone);
  }).withMessage('Invalid phone'), (0, _expressValidator.check)('check_in').exists({
    checkNull: true,
    checkFalsy: true
  }).withMessage("Check In is required"), (0, _expressValidator.check)('check_in').custom(function (check_in) {
    return !!validateDate(check_in);
  }).withMessage('Invalid check-in datetime')]
};
exports.guestRules = guestRules;