import React, { useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

import BusinessDetailsForm from './BusinessDetailsForm';
import ReviewBalancesheet from './ReviewBalanceSheet';

import UserDataService from '../services/user';
import AccountingProviderService from '../services/accountingProvider';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSelectedMenu } from '../store/userSlice';
import { Loan } from '../typings';

import { AxiosError, AxiosResponse } from 'axios';
import { LoadingSpinner } from './LoadingSpinner';

const steps = ['Fill Business loan details', 'Review Balancesheet'];

const ApplyLoanStepper = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const [balanceSheet, setBalanceSheet] = useState<any[]>([]);
  const [loanData, setLoanData] = useState<Loan | undefined>();
  const [errorMsg, setErrorMsg] = useState('');

  const userData = useAppSelector((state) => state.user);
  const currentLoanId = userData.currentLoanId;
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getBalanceSheetToReview = (loanDataEntered: Loan) => {
    setErrorMsg('');
    setIsLoading(true);
    setLoanData(loanDataEntered);
    AccountingProviderService.getBalanceSheet(loanDataEntered.companyTaxId)
      .then((response: AxiosResponse) => {
        setBalanceSheet(response.data);
        setIsLoading(false);
        handleNext();
      })
      .catch((e: AxiosError) => {
        setIsLoading(false);
        setErrorMsg(e.message || 'Something went wrong! Please try again later');
      });
  };

  const submitLoan = () => {
    setErrorMsg('');
    setIsLoading(true);
    UserDataService.submitLoan(userData.id as string, { loanData: loanData as Loan, balanceSheet }, currentLoanId as string)
      .then(() => {
        dispatch(setSelectedMenu(1));
        setIsLoading(false);
      })
      .catch((e: AxiosError) => {
        setErrorMsg(e.message || 'Something went wrong! Please try again later');
        setIsLoading(false);
      });
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BusinessDetailsForm loanData={loanData as Loan} onClickHandler={getBalanceSheetToReview} />;
      case 1:
        return <ReviewBalancesheet balanceSheet={balanceSheet} onClickHandler={submitLoan} onBackClick={handleBack} />;
      default:
        return null;
    }
  };

  React.useEffect(() => {
    if (currentLoanId !== null) {
      setIsLoading(true);
      UserDataService.getLoan(userData.id as string, currentLoanId)
        .then((response: AxiosResponse<Loan>) => {
          setLoanData(response.data);
          setIsLoading(false);
        })
        .catch((e: AxiosError) => {
          setIsLoading(false);
          setErrorMsg(e.message || 'Something went wrong! Please try again later');
        });
    }
  }, [currentLoanId, userData.id]);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {errorMsg && <div className='error'>{errorMsg}</div>}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>{getStepContent(activeStep)}</div>
    </div>
  );
};

export default ApplyLoanStepper;
