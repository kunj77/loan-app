"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var http_errors_1 = __importDefault(require("http-errors"));
var constants_1 = require("./database/constants");
// Express Route
var user_route_1 = __importDefault(require("../backend/routes/user.route"));
var accounting_route_1 = __importDefault(require("../backend/routes/accounting.route"));
var decisionEngine_route_1 = __importDefault(require("../backend/routes/decisionEngine.route"));
// Connecting to MongoDB Database
mongoose_1.default
    .connect(constants_1.dbName)
    .then(function (x) {
    console.log("Connected to Mongo! Database name: \"".concat(x.connections[0].name, "\""));
})
    .catch(function (err) {
    console.error('Error connecting to MongoDB', err);
});
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/users', user_route_1.default);
app.use('/accountingProvider', accounting_route_1.default);
app.use('/decisionEngine', decisionEngine_route_1.default);
// PORT
var port = process.env.PORT || 4000;
var server = app.listen(port, function () {
    console.log('Connected to port ' + port);
});
// 404 Error
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
var errorHandler = function (err, req, res, next) {
    if (!err.statusCode)
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
};
app.use(errorHandler);
exports.default = app;
