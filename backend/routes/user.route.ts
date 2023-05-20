import express, { Request, Response, NextFunction } from 'express';
import userSchema from '../Models/User';
import loanSchema from '../Models/Loan';
import axios from 'axios';

import { getPreassessmentValue, getYearEstablishedIn } from '../utils/loan';
import { BalanceSheetEntry, User } from '../typings';

const router = express.Router();

router.route('/create').post((req: Request, res: Response, next: NextFunction) => {
  userSchema.findOne({ email: req.body.email }, (err: unknown, user: User) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.status(409).json({ message: 'Email already exists in the database.' });
    }
    userSchema.create(req.body, (error: Error, data: any) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });
});

router.route('/').get((req: Request, res: Response, next: NextFunction) => {
  userSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userSchema.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = password === user.password;

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ id: user.id });
});

router.post('/:userId/loans', async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const loan = new loanSchema({userId});
    await loan.save();

    res.status(201).json({id: loan._id});
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: "Failed to create loan" });
  }
});

router.post('/:userId/loans/:loanId?', async (req: Request, res: Response) => {
  const { userId, loanId } = req.params;
  const { companyName, loanAmount } = req.body.loanData;

  try {
    const yearEstablished = getYearEstablishedIn();
    const balanceSheet = req.body.balanceSheet;
    const preAssessment = getPreassessmentValue(balanceSheet, loanAmount);
    const profitOrLossSum = balanceSheet.slice(0, 12).reduce((sum: number, d: BalanceSheetEntry) => sum + d.profitOrLoss, 0);

    let loanData;

    if (loanId) {
      // Update existing loan
      loanData = {
        ...req.body.loanData,
        userId,
        preAssessment,
        status: 'Submitted'
      };

      await loanSchema.findByIdAndUpdate(loanId, loanData);
    } else {
      // Create a new loan
      loanData = new loanSchema({
        ...req.body.loanData,
        userId,
        preAssessment,
        status: 'Submitted'
      });

      await loanData.save();
    }

    // Call the decision-engine API
    const decisionEngineResponse = await axios.post('http://backend:4000/decisionEngine/getDecision', {
      companyName,
      yearEstablished,
      profitOrLossSum,
      preAssessment,
      loanAmount
    });

    const { status, interestRate, repaymentTerm } = decisionEngineResponse.data;

    if (loanId) {
      await loanSchema.findByIdAndUpdate(loanId, { status, interestRate, repaymentTerm });
    } else {
      loanData.status = status;
      loanData.interestRate = interestRate;
      loanData.repaymentTerm = repaymentTerm;
      await loanData.save();
    }

    res.status(201).json({ id: loanId || loanData._id });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: "Failed to update/create loan" });
  }
});

router.get('/:userId/loans', async (req: Request, res: Response) => {
  try {
    const loans = await loanSchema.find({ userId: req.params.userId }).populate('userId');
    res.json(loans);
  } catch (err: unknown) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/:userId/loans/:loanId', async (req: Request, res: Response) => {
  try {
    const loans = await loanSchema.find({ userId: req.params.userId, loanId: req.params.loanId }).populate('userId');
    res.json(loans);
  } catch (err: unknown) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

export default router;

