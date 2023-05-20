import mongoose, { Schema } from 'mongoose';
import { Loan } from '../typings';

const loanSchema: Schema = new Schema<Loan>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  companyName: {
    type: String,
  },
  companyTaxId: {
    type: Number,
  },
  loanAmount: {
    type: Number,
  },
  accountingProvider: {
    type: String,
  },
  preAssessment: {
    type: Number,
  },
  status: {
    type: String,
    default: 'Draft'
  },
  interestRate: {
    type: Number
  },
  repaymentTerm: {
    type: Number
  }
}, {
  collection: 'loans'
});

export default mongoose.model<Loan>('Loan', loanSchema);
