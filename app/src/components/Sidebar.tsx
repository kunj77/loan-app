import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSelectedMenu, setCurrentLoanId } from '../store/userSlice';
import UserDataService from '../services/user';
import { AxiosError, AxiosResponse } from 'axios';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const selectedMenu = userData.selectedMenu;
  const currentLoanId = userData.currentLoanId;

  const initiateLoanIfNull = () => {
    if (currentLoanId === null) {
      UserDataService.initiateLoan(userData.id as string)
      .then((response: AxiosResponse<any>) => {
        dispatch(setCurrentLoanId(response.data.id))
      })
      .catch((e: AxiosError) => {
        console.log("failed to initiate loan", e);
      });
    }
  }

  const navItems = [
    {
      title: 'Home',
      itemId: '1',
      onClick: () => dispatch(setSelectedMenu(1))
    },
    {
      title: 'Apply new Business Loan',
      itemId: '2',
      onClick: () => { initiateLoanIfNull(); dispatch(setSelectedMenu(2))}
    },
  ];
  return (
    <div className="sidebar">
          {navItems.map((item, index) => {
            return (
              <div key={item.itemId}
                onClick={item.onClick}
                className={`${selectedMenu === (index + 1) ? 'active' : ''}`}>
                <span>
                  {item.title}
                </span>
              </div>
            );
          })}
    </div>
  );
};

export default Sidebar;
