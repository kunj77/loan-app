"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/all', (req, res) => {
    const accountingProviders = ['Xero', 'MYOB'];
    res.json(accountingProviders);
});
router.get('/balance-sheet/:id', (req, res) => {
    // This function currently returns a random balance sheet
    const now = new Date();
    const sheet = [];
    for (let i = 0; i < 12; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const profitOrLoss = Math.floor(Math.random() * 1000000) - 400000;
        const assetsValue = Math.floor(Math.random() * 100000) + 10000;
        sheet.push({ year, month, profitOrLoss, assetsValue });
    }
    res.json(sheet);
});
exports.default = router;
