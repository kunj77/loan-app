"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/all', function (req, res) {
    var accountingProviders = ['Xero', 'MYOB'];
    res.json(accountingProviders);
});
router.get('/balance-sheet/:id', function (req, res) {
    // This function currently returns a random balance sheet
    var now = new Date();
    var sheet = [];
    for (var i = 0; i < 12; i++) {
        var date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var profitOrLoss = Math.floor(Math.random() * 1000000) - 400000;
        var assetsValue = Math.floor(Math.random() * 100000) + 10000;
        sheet.push({ year: year, month: month, profitOrLoss: profitOrLoss, assetsValue: assetsValue });
    }
    res.json(sheet);
});
exports.default = router;
