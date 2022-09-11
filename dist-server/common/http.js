"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationError = exports.UnauthorizedError = exports.TooManyRequestError = exports.SuccessResponse = exports.ServerError = exports.OtherSuccessResponse = exports.NotFoundError = exports.ForbiddenError = exports.CreationSuccessResponse = exports.ConflictError = exports.BadRequestError = void 0;

var _http = require("../config/http.config");

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SuccessResponse = function SuccessResponse(res, message, data) {
  _logger["default"].info(message);

  return res.status(_http.SuccessResCode).send({
    success: true,
    message: message,
    data: !data ? null : data
  });
};

exports.SuccessResponse = SuccessResponse;

var CreationSuccessResponse = function CreationSuccessResponse(res, message, data) {
  _logger["default"].info(message);

  return res.status(_http.CreateSuccessResCode).send({
    success: true,
    message: message,
    data: !data ? null : data
  });
};

exports.CreationSuccessResponse = CreationSuccessResponse;

var OtherSuccessResponse = function OtherSuccessResponse(res, message, data) {
  _logger["default"].info(message);

  return res.status(_http.NoContentSuccessResCode).send({
    success: true,
    message: message,
    data: !data ? null : data
  });
};

exports.OtherSuccessResponse = OtherSuccessResponse;

var NotFoundError = function NotFoundError(res, message, data) {
  _logger["default"].error(message);

  return res.status(_http.NotFoundResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};

exports.NotFoundError = NotFoundError;

var BadRequestError = function BadRequestError(res, message, data) {
  _logger["default"].warn(message);

  return res.status(_http.UserErrorResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};

exports.BadRequestError = BadRequestError;

var ValidationError = function ValidationError(res, message, data) {
  _logger["default"].warn(message);

  return res.status(_http.UserValidationErrorResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};

exports.ValidationError = ValidationError;

var UnauthorizedError = function UnauthorizedError(res, message, data) {
  _logger["default"].warn(message);

  return res.status(_http.InvalidAuthenticationErrorResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};

exports.UnauthorizedError = UnauthorizedError;

var ForbiddenError = function ForbiddenError(res, message, data) {
  _logger["default"].error(message);

  return res.status(_http.AuthenticationErrorResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};

exports.ForbiddenError = ForbiddenError;

var ConflictError = function ConflictError(res, message, data) {
  _logger["default"].warn(message);

  return res.status(_http.ConflictResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};

exports.ConflictError = ConflictError;

var TooManyRequestError = function TooManyRequestError(res, message, data) {
  _logger["default"].warn(message);

  return res.status(_http.TooManyRequestsResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};

exports.TooManyRequestError = TooManyRequestError;

var ServerError = function ServerError(res, message, data) {
  _logger["default"].error(message);

  return res.status(_http.ServerErrorResCode).send({
    success: false,
    message: message,
    data: !data ? null : data
  });
};

exports.ServerError = ServerError;