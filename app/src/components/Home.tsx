import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import UserDataService from '../services/user';
import { setLoans, setCurrentLoanId, setSelectedMenu } from '../store/userSlice';
import Approved from '../assets/approved.png';
import Rejected from '../assets/rejected.png';
import Pending from '../assets/pending.png';
import Edit from '../assets/edit.png';
import { AxiosError, AxiosResponse } from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.user);
  const loans = userData.loans;
  const currentLoanId = userData.currentLoanId;

  const editLoan = (loanId: string) => {
    dispatch(setCurrentLoanId(loanId));
    dispatch(setSelectedMenu(2));
  }

  const goToApplyLoan = () => {
    if (currentLoanId === null) {
      UserDataService.initiateLoan(userData.id as string)
      .then((response: AxiosResponse<any>) => {
        dispatch(setCurrentLoanId(response.data.id))
      })
      .catch((e: AxiosError) => {
        console.log("failed to initiate loan", e);
      });
    }

    dispatch(setSelectedMenu(2));
  }

  React.useEffect(() => {
    dispatch(setCurrentLoanId(null))

    if (!userData.isLoggedIn) {
      navigate('/login');
    } else {
      UserDataService.getLoans(userData.id as string)
      .then((response: AxiosResponse) => {
        dispatch(setLoans(response.data))
      })
      .catch((e: AxiosError) => {
        console.log("Could not fetch loans")
      });
    }
  }, []);

  return (
    <div>
      {loans.length > 0 ?
        loans.map((loan) => (
          <div key={loan._id} className="snapshot">
            <p className="title">{loan.companyName || 'Untitled'}
            {loan.status === 'Draft' && <img src={Edit} onClick={() => editLoan(loan._id)} alt={'Edit Loan'}/>}
            </p>
            <div className="content">
              <p><span className='label'>Amount: </span>{loan.loanAmount}</p>
              <img src={loan.status === 'Approved' ? Approved : loan.status === 'Rejected' ? Rejected : Pending} alt={'Loan status'}/>
            </div>
            <p className='footer'><span className='label'>Status: </span>{loan.status}</p>
          </div>
        )) :
        <p>No loans applied yet! Get started <span className='clickable' onClick={goToApplyLoan}>here!</span></p>}
    </div>
  );
};

export default Home;
