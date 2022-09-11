"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _common = require("./common");

var _morgan = _interopRequireDefault(require("./middleware/morgan"));

var _models = _interopRequireDefault(require("./models"));

var _default2 = require("./config/default.config");

var _admin = _interopRequireDefault(require("./routes/admin.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _guests = _interopRequireDefault(require("./routes/guests.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])(); //options for cors midddleware

var options = _cors["default"].CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE'
};
app.use((0, _express.json)({
  limit: '100mb'
}));
app.use((0, _express.urlencoded)({
  extended: true,
  limit: '100mb'
}));
app.use((0, _helmet["default"])());
app.use(_morgan["default"]); // add cors

app.use((0, _cors["default"])(options)); // simple route

app.get("/", function (request, response) {
  (0, _common.SuccessResponse)(response, "Guest Book server activated.");
}); // Sequelize initialization

var dropAndResync = false;

_models["default"].sequelize.sync({
  force: dropAndResync
}).then(function () {
  (0, _default2.createAdmin)(dropAndResync);
  if (dropAndResync) _common.logger.warn('Drop and Resync Db with defaults');
});

app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public'))); // Binding routes

(0, _admin["default"])(app);
(0, _auth["default"])(app);
(0, _guests["default"])(app); // // set port, listen for requests
// const PORT = process.env.PORT || 808;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`)
// })

var _default = app;
exports["default"] = _default;