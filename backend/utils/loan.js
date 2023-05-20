"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYearEstablishedIn = exports.getPreassessmentValue = void 0;
var getPreassessmentValue = function (balanceSheet, loanAmount) {
    var preAssessment = 20;
    var profitOrLossSum = balanceSheet.slice(0, 12).reduce(function (sum, d) { return sum + d.profitOrLoss; }, 0);
    if (profitOrLossSum > 0) {
        preAssessment = 60;
    }
    var assetsValueAvg = balanceSheet.slice(0, 12).reduce(function (sum, d) { return sum + d.assetsValue; }, 0) / 12;
    if (assetsValueAvg > loanAmount) {
        preAssessment = 100;
    }
    return preAssessment;
};
exports.getPreassessmentValue = getPreassessmentValue;
var getYearEstablishedIn = function () {
    var currentYear = new Date().getFullYear();
    return currentYear - Math.floor(Math.random() * 20);
};
exports.getYearEstablishedIn = getYearEstablishedIn;
