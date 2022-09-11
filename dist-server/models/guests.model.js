"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, Sequelize) {
  var Guest = sequelize.define("guest", {
    unique_id: {
      type: Sequelize.STRING(40),
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    middlename: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    lastname: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    check_in: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
  return Guest;
};

exports["default"] = _default;