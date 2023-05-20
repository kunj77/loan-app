"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var User_1 = __importDefault(require("../Models/User"));
var Loan_1 = __importDefault(require("../Models/Loan"));
var axios_1 = __importDefault(require("axios"));
var loan_1 = require("../utils/loan");
var router = express_1.default.Router();
router.route('/create').post(function (req, res, next) {
    User_1.default.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.status(409).json({ message: 'Email already exists in the database.' });
        }
        User_1.default.create(req.body, function (error, data) {
            if (error) {
                return next(error);
            }
            else {
                res.json(data);
            }
        });
    });
});
router.route('/').get(function (req, res, next) {
    User_1.default.find(function (error, data) {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    });
});
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, isPasswordValid;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid email or password' })];
                }
                isPasswordValid = password === user.password;
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid email or password' })];
                }
                res.status(200).json({ id: user.id });
                return [2 /*return*/];
        }
    });
}); });
router.post('/:userId/loans', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, loan, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                loan = new Loan_1.default({ userId: userId });
                return [4 /*yield*/, loan.save()];
            case 2:
                _a.sent();
                res.status(201).json({ id: loan._id });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).json({ error: "Failed to create loan" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/:userId/loans/:loanId?', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, loanId, _b, companyName, loanAmount, yearEstablished, balanceSheet, preAssessment, profitOrLossSum, loanData, decisionEngineResponse, _c, status_1, interestRate, repaymentTerm, err_2;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.params, userId = _a.userId, loanId = _a.loanId;
                _b = req.body.loanData, companyName = _b.companyName, loanAmount = _b.loanAmount;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 11, , 12]);
                yearEstablished = (0, loan_1.getYearEstablishedIn)();
                balanceSheet = req.body.balanceSheet;
                preAssessment = (0, loan_1.getPreassessmentValue)(balanceSheet, loanAmount);
                profitOrLossSum = balanceSheet.slice(0, 12).reduce(function (sum, d) { return sum + d.profitOrLoss; }, 0);
                loanData = void 0;
                if (!loanId) return [3 /*break*/, 3];
                // Update existing loan
                loanData = __assign(__assign({}, req.body.loanData), { userId: userId, preAssessment: preAssessment, status: 'Submitted' });
                return [4 /*yield*/, Loan_1.default.findByIdAndUpdate(loanId, loanData)];
            case 2:
                _d.sent();
                return [3 /*break*/, 5];
            case 3:
                // Create a new loan
                loanData = new Loan_1.default(__assign(__assign({}, req.body.loanData), { userId: userId, preAssessment: preAssessment, status: 'Submitted' }));
                return [4 /*yield*/, loanData.save()];
            case 4:
                _d.sent();
                _d.label = 5;
            case 5: return [4 /*yield*/, axios_1.default.post('http://backend:4000/decisionEngine/getDecision', {
                    companyName: companyName,
                    yearEstablished: yearEstablished,
                    profitOrLossSum: profitOrLossSum,
                    preAssessment: preAssessment,
                    loanAmount: loanAmount
                })];
            case 6:
                decisionEngineResponse = _d.sent();
                _c = decisionEngineResponse.data, status_1 = _c.status, interestRate = _c.interestRate, repaymentTerm = _c.repaymentTerm;
                if (!loanId) return [3 /*break*/, 8];
                return [4 /*yield*/, Loan_1.default.findByIdAndUpdate(loanId, { status: status_1, interestRate: interestRate, repaymentTerm: repaymentTerm })];
            case 7:
                _d.sent();
                return [3 /*break*/, 10];
            case 8:
                loanData.status = status_1;
                loanData.interestRate = interestRate;
                loanData.repaymentTerm = repaymentTerm;
                return [4 /*yield*/, loanData.save()];
            case 9:
                _d.sent();
                _d.label = 10;
            case 10:
                res.status(201).json({ id: loanId || loanData._id });
                return [3 /*break*/, 12];
            case 11:
                err_2 = _d.sent();
                console.error(err_2);
                res.status(500).json({ error: "Failed to update/create loan" });
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); });
router.get('/:userId/loans', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loans, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Loan_1.default.find({ userId: req.params.userId }).populate('userId')];
            case 1:
                loans = _a.sent();
                res.json(loans);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error(err_3);
                res.status(500).send('Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/:userId/loans/:loanId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loans, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Loan_1.default.find({ userId: req.params.userId, loanId: req.params.loanId }).populate('userId')];
            case 1:
                loans = _a.sent();
                res.json(loans);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error(err_4);
                res.status(500).send('Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
