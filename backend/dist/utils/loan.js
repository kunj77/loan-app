"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYearEstablishedIn = exports.getPreassessmentValue = void 0;
const getPreassessmentValue = (balanceSheet, loanAmount) => {
    let preAssessment = 20;
    const profitOrLossSum = balanceSheet.slice(0, 12).reduce((sum, d) => sum + d.profitOrLoss, 0);
    if (profitOrLossSum > 0) {
        preAssessment = 60;
    }
    const assetsValueAvg = balanceSheet.slice(0, 12).reduce((sum, d) => sum + d.assetsValue, 0) / 12;
    if (assetsValueAvg > loanAmount) {
        preAssessment = 100;
    }
    return preAssessment;
};
exports.getPreassessmentValue = getPreassessmentValue;
const getYearEstablishedIn = () => {
    const currentYear = new Date().getFullYear();
    return currentYear - Math.floor(Math.random() * 20);
};
exports.getYearEstablishedIn = getYearEstablishedIn;
