import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/getDecision', async (req: Request, res: Response) => {
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

export default router;
