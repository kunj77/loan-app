"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_errors_1 = __importDefault(require("http-errors"));
const constants_1 = require("./database/constants");
// Express Route
const user_route_1 = __importDefault(require("./routes/user.route"));
const accounting_route_1 = __importDefault(require("./routes/accounting.route"));
const decisionEngine_route_1 = __importDefault(require("./routes/decisionEngine.route"));
// Connecting to MongoDB Database
mongoose_1.default
    .connect(constants_1.dbName)
    .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
})
    .catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/users', user_route_1.default);
app.use('/accountingProvider', accounting_route_1.default);
app.use('/decisionEngine', decisionEngine_route_1.default);
// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port);
});
// 404 Error
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
const errorHandler = (err, req, res, next) => {
    if (!err.statusCode)
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
};
app.use(errorHandler);
exports.default = app;
