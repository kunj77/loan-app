import { BalanceSheetEntry } from "../typings";

export const getPreassessmentValue = (balanceSheet: BalanceSheetEntry[], loanAmount: number) => {
    let preAssessment = 20;

    const profitOrLossSum = balanceSheet.slice(0, 12).reduce((sum: number, d) => sum + d.profitOrLoss, 0);
    if (profitOrLossSum > 0) {
      preAssessment = 60;
    }

    const assetsValueAvg = balanceSheet.slice(0, 12).reduce((sum: number, d) => sum + d.assetsValue, 0) / 12;
    if (assetsValueAvg > loanAmount) {
      preAssessment = 100;
    }
    return preAssessment;
}

export const getYearEstablishedIn = () => {
  const currentYear = new Date().getFullYear();
  return currentYear - Math.floor(Math.random() * 20);
}