import express, { Request, Response } from 'express';
import { BalanceSheetEntry } from '../typings';

const router = express.Router();

router.get('/all', (req: Request, res: Response) => {
  const accountingProviders: string[] = ['Xero', 'MYOB'];
  res.json(accountingProviders);
});

router.get('/balance-sheet/:id', (req: Request, res: Response) => {
  // This function currently returns a random balance sheet
  const now = new Date();
  const sheet: BalanceSheetEntry[] = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const profitOrLoss = Math.floor(Math.random() * 1000000) - 400000;
    const assetsValue = Math.floor(Math.random() * 100000) + 10000;

    sheet.push({ year, month, profitOrLoss, assetsValue });
  }

  res.json(sheet);
});

export default router;
