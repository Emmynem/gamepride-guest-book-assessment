"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, Sequelize) {
  var Admin = sequelize.define("admin", {
    unique_id: {
      type: Sequelize.STRING(40),
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    }
  });
  return Admin;
};

exports["default"] = _default;