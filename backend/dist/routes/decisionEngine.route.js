"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/getDecision', async (req, res) => {
    // This is mock function that currently approves or rejects loan only based on the preAssessment value
    const { preAssessment } = req.body;
    // Generate a random interest rate and repayment term
    const interestRate = Math.floor(Math.random() * 10) + 5;
    const repaymentTerm = Math.floor(Math.random() * 24) + 12;
    // If preAssessment is 60% or above, set status to "approved"
    let status = 'Rejected';
    if (preAssessment >= 60) {
        status = 'Approved';
    }
    // Return the decision
    res.json({
        interestRate,
        repaymentTerm,
        status,
    });
});
exports.default = router;
