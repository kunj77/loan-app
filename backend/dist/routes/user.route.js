"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../Models/User"));
const Loan_1 = __importDefault(require("../Models/Loan"));
const axios_1 = __importDefault(require("axios"));
const loan_1 = require("../utils/loan");
const router = express_1.default.Router();
router.route('/create').post((req, res, next) => {
    User_1.default.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.status(409).json({ message: 'Email already exists in the database.' });
        }
        User_1.default.create(req.body, (error, data) => {
            if (error) {
                return next(error);
            }
            else {
                res.json(data);
            }
        });
    });
});
router.route('/').get((req, res, next) => {
    User_1.default.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    });
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ id: user.id });
});
router.post('/:userId/loans', async (req, res) => {
    const { userId } = req.params;
    try {
        const loan = new Loan_1.default({ userId });
        await loan.save();
        res.status(201).json({ id: loan._id });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create loan" });
    }
});
router.post('/:userId/loans/:loanId?', async (req, res) => {
    const { userId, loanId } = req.params;
    const { companyName, loanAmount } = req.body.loanData;
    try {
        const yearEstablished = (0, loan_1.getYearEstablishedIn)();
        const balanceSheet = req.body.balanceSheet;
        const preAssessment = (0, loan_1.getPreassessmentValue)(balanceSheet, loanAmount);
        const profitOrLossSum = balanceSheet.slice(0, 12).reduce((sum, d) => sum + d.profitOrLoss, 0);
        let loanData;
        if (loanId) {
            // Update existing loan
            loanData = {
                ...req.body.loanData,
                userId,
                preAssessment,
                status: 'Submitted'
            };
            await Loan_1.default.findByIdAndUpdate(loanId, loanData);
        }
        else {
            // Create a new loan
            loanData = new Loan_1.default({
                ...req.body.loanData,
                userId,
                preAssessment,
                status: 'Submitted'
            });
            await loanData.save();
        }
        // Call the decision-engine API
        const decisionEngineResponse = await axios_1.default.post('http://backend:4000/decisionEngine/getDecision', {
            companyName,
            yearEstablished,
            profitOrLossSum,
            preAssessment,
            loanAmount
        });
        const { status, interestRate, repaymentTerm } = decisionEngineResponse.data;
        if (loanId) {
            await Loan_1.default.findByIdAndUpdate(loanId, { status, interestRate, repaymentTerm });
        }
        else {
            loanData.status = status;
            loanData.interestRate = interestRate;
            loanData.repaymentTerm = repaymentTerm;
            await loanData.save();
        }
        res.status(201).json({ id: loanId || loanData._id });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update/create loan" });
    }
});
router.get('/:userId/loans', async (req, res) => {
    try {
        const loans = await Loan_1.default.find({ userId: req.params.userId }).populate('userId');
        res.json(loans);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
router.get('/:userId/loans/:loanId', async (req, res) => {
    try {
        const loans = await Loan_1.default.find({ userId: req.params.userId, loanId: req.params.loanId }).populate('userId');
        res.json(loans);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
exports.default = router;
