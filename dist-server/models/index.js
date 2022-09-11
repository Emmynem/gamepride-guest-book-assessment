"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbConfig = require("../config/db.config.js");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _admin = _interopRequireDefault(require("./admin.model"));

var _guests = _interopRequireDefault(require("./guests.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize = new _sequelize["default"](_dbConfig.DB, _dbConfig.USER, _dbConfig.PASSWORD, {
  host: _dbConfig.HOST,
  dialect: _dbConfig.dialect,
  logging: _dbConfig.logging,
  operatorsAliases: 0,
  pool: {
    max: _dbConfig.pool.max,
    min: _dbConfig.pool.min,
    acquire: _dbConfig.pool.acquire,
    idle: _dbConfig.pool.idle
  },
  dialectOptions: {
    // useUTC: _dialectOptions.useUTC, 
    dateStrings: _dbConfig.dialectOptions.dateStrings,
    typeCast: _dbConfig.dialectOptions.typeCast
  },
  timezone: _dbConfig.timezone
});
var db = {};
db.Sequelize = _sequelize["default"];
db.sequelize = sequelize;
db.admin = (0, _admin["default"])(sequelize, _sequelize["default"]);
db.guest = (0, _guests["default"])(sequelize, _sequelize["default"]);
var _default = db;
exports["default"] = _default;