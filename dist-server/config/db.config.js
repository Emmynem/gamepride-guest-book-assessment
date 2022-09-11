"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timezone = exports.production = exports.pool = exports.logging = exports.dialectOptions = exports.dialect = exports.USER = exports.PASSWORD = exports.HOST = exports.DB = void 0;
var HOST = "localhost";
exports.HOST = HOST;
var USER = "root";
exports.USER = USER;
var PASSWORD = "";
exports.PASSWORD = PASSWORD;
var DB = "gamepride-guest-book-assessment";
exports.DB = DB;
var dialect = "mysql";
exports.dialect = dialect;
var logging = 0;
exports.logging = logging;
var pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};
exports.pool = pool;
var dialectOptions = {
  useUTC: false,
  //for reading from database
  dateStrings: true,
  typeCast: true
};
exports.dialectOptions = dialectOptions;
var timezone = '+01:00';
exports.timezone = timezone;
var production = false;
exports.production = production;