"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var winston = _interopRequireWildcard(require("winston"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _winston$format = winston.format,
    combine = _winston$format.combine,
    timestamp = _winston$format.timestamp,
    printf = _winston$format.printf,
    colorize = _winston$format.colorize;
var logger = winston.createLogger({
  level: 'info',
  format: combine(colorize({
    all: true
  }), timestamp({
    format: 'YYYY-MM-DD hh:mm:ss.SSS A'
  }), printf(function (info) {
    return "[".concat(info.timestamp, "] ").concat(info.level, ": ").concat(info.message);
  })),
  transports: [new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }), new winston.transports.File({
    filename: 'logs/warnings.log',
    level: 'warn'
  }), new winston.transports.File({
    filename: 'logs/combined.log'
  }), new winston.transports.Console()],
  exitOnError: false
});
var _default = logger;
exports["default"] = _default;