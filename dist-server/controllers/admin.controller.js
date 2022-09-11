"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAdmin = addAdmin;
exports.getAdmin = getAdmin;
exports.getAdmins = getAdmins;
exports.removeAdmin = removeAdmin;
exports.updateAdmin = updateAdmin;

var _expressValidator = require("express-validator");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _uuid = require("uuid");

var _common = require("../common");

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var hashSync = _bcryptjs["default"].hashSync;
var Admin = _models["default"].admin;
var Op = _models["default"].Sequelize.Op;

function getAdmins(req, res) {
  Admin.findAndCountAll({
    attributes: {
      exclude: ['password', 'id']
    },
    where: {
      id: _defineProperty({}, Op.ne, 1)
    },
    order: [['createdAt', 'DESC']]
  }).then(function (admins) {
    if (!admins || admins.length == 0) {
      (0, _common.SuccessResponse)(res, "Admins Not found", []);
    } else {
      (0, _common.SuccessResponse)(res, "Admins loaded", admins);
    }
  })["catch"](function (err) {
    (0, _common.ServerError)(res, err.message, null);
  });
}

;

function getAdmin(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    (0, _common.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Admin.findOne({
      attributes: {
        exclude: ['password', 'id']
      },
      where: _objectSpread(_objectSpread({}, payload), {}, {
        id: _defineProperty({}, Op.ne, 1)
      })
    }).then(function (admin) {
      if (!admin) {
        (0, _common.NotFoundError)(res, "Admin not found", null);
      } else {
        (0, _common.SuccessResponse)(res, "Admin loaded", admin);
      }
    })["catch"](function (err) {
      (0, _common.ServerError)(res, err.message, null);
    });
  }
}

;

function addAdmin(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    (0, _common.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Admin.create(_objectSpread(_objectSpread({}, payload), {}, {
      unique_id: (0, _uuid.v4)(),
      password: hashSync(req.body.password, 8)
    })).then(function (admin) {
      (0, _common.CreationSuccessResponse)(res, "Admin was registered successfully!", {
        unique_id: admin.unique_id
      });
    })["catch"](function (err) {
      if (err.original.code === 'ER_DUP_ENTRY') {
        (0, _common.ConflictError)(res, "Email already exists", null);
      } else {
        (0, _common.ServerError)(res, err.original.sqlMessage, null);
      }
    });
  }
}

function updateAdmin(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    (0, _common.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Admin.update(_objectSpread({}, payload), {
      where: {
        unique_id: payload.unique_id,
        id: _defineProperty({}, Op.ne, 1)
      }
    }).then(function (data) {
      if (data == 0) {
        (0, _common.NotFoundError)(res, "Admin not found", null);
      } else {
        (0, _common.OtherSuccessResponse)(res, "Admin details updated successfully!");
      }
    })["catch"](function (err) {
      (0, _common.ServerError)(res, err.message, null);
    });
  }
}

;

function removeAdmin(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    (0, _common.ValidationError)(res, "Validation Error Occured", errors.array());
  } else {
    var payload = (0, _expressValidator.matchedData)(req);
    Admin.destroy({
      where: _objectSpread(_objectSpread({}, payload), {}, {
        id: _defineProperty({}, Op.ne, 1)
      })
    }).then(function (data) {
      if (!data) {
        (0, _common.NotFoundError)(res, "Admin not found", null);
      } else {
        (0, _common.OtherSuccessResponse)(res, "Admin details deleted successfully!");
      }
    })["catch"](function (err) {
      (0, _common.ServerError)(res, err.message, null);
    });
  }
}

;