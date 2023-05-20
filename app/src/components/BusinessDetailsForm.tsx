import { AxiosError, AxiosResponse } from 'axios';
import React, {useState} from 'react';
import { useForm, FieldError, SubmitHandler } from 'react-hook-form';
import AccountingProviderService from '../services/accountingProvider';
import { Loan } from '../typings';

type BusinessDetailsFormProps = {
  loanData: Loan;
  onClickHandler: SubmitHandler<Loan>;
};

const BusinessDetailsForm: React.FC<BusinessDetailsFormProps> = ({loanData, onClickHandler}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onBlur', defaultValues: loanData });

  const registerOptions = {
    companyName: { required: 'Company name is required' },
    companyTaxId: { required: 'Company Tax Id is required' },
    loanAmount: { required: 'Loan amount is required' },
    accountingProvider: { required: 'Accounting provider is required' }
  };

  const [accountingProviders, setAccountingProviders] = useState([]);

  React.useEffect(() => {  
    AccountingProviderService.getAllProviders()
    .then((response: AxiosResponse) => {
      setAccountingProviders(response.data);
    })
    .catch((e: AxiosError) => {
      console.log("Could not fetch providers")
    });
  }, []);

  return (
    <>
    <div className="loan-form-container">
      <form onSubmit={handleSubmit(onClickHandler)}>
        <div>
          <input
            type="text"
            placeholder="Company Name"
            {...register('companyName', registerOptions.companyName)}
          />
          {errors?.companyName && (
            <p className="error-msg">
              {(errors.companyName as FieldError)?.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="number"
            placeholder="Company Tax Id"
            {...register('companyTaxId', registerOptions.companyTaxId)}
          />
          {errors?.companyTaxId && (
            <p className="error-msg">
              {(errors.companyTaxId as FieldError)?.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="number"
            placeholder="Loan Amount"
            max={100000000}
            {...register('loanAmount', registerOptions.loanAmount)}
          />
          {errors?.loanAmount && (
            <p className="error-msg">
              {(errors.loanAmount as FieldError)?.message}
            </p>
          )}
        </div>
          <select {...register('accountingProvider', registerOptions.accountingProvider)} >
            <option value="">Select an accounting provider</option>
            {accountingProviders.map(accountingProvider => (
              <option key={accountingProvider} value={accountingProvider}>{accountingProvider}</option>
            ))}
          </select>
        <div className='button-container'>
          <button>Next</button>
        </div>
      </form>
    </div>
    </>
  );
};
export default BusinessDetailsForm;
