export interface Loan {
    _id: string;
    userId: string;
    companyName: string;
    companyTaxId: number;
    loanAmount: number;
    accountingProvider: string;
    preAssessment: string;
    status: string;
    interestRate: number;
    repaymentTerm: number;
  }

  export interface User {
    name: string;
    email: string;
    password: string;
  }

  export interface LoginData {
    email: string;
    password: string;
  }