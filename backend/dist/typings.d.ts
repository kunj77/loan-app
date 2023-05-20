import mongoose, { Document } from 'mongoose';
export interface BalanceSheetEntry {
    year: number;
    month: number;
    profitOrLoss: number;
    assetsValue: number;
}
export interface Loan extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    companyName?: string;
    companyTaxId?: number;
    loanAmount?: number;
    accountingProvider?: string;
    preAssessment?: number;
    status: string;
    interestRate?: number;
    repaymentTerm?: number;
}
export interface User extends Document {
    name: string;
    email: string;
    password: string;
}
