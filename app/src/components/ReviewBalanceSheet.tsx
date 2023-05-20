import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

interface ReviewBalancesheetProps {
  balanceSheet: any[];
  onClickHandler: () => void;
  onBackClick: () => void;
}

const ReviewBalanceSheet: React.FC<ReviewBalancesheetProps> = ({ balanceSheet, onClickHandler, onBackClick }) => {
  return (
    <div className='balance-sheet-container'>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Assets Value</TableCell>
            <TableCell>Profit/Loss</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {balanceSheet.map((data, index) => (
            <TableRow key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <TableCell>{data.year}</TableCell>
              <TableCell>{data.month}</TableCell>
              <TableCell>{data.assetsValue}</TableCell>
              <TableCell>{data.profitOrLoss}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='button-container'>
        <button onClick={onBackClick}>Back</button>
        <button onClick={onClickHandler}>Submit</button>
      </div>
    </div>
  );
};

export default ReviewBalanceSheet;
