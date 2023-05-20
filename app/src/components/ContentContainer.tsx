import React from 'react';
import Home from './Home';
import ApplyLoanStepper from './ApplyLoanStepper';
import { useAppSelector } from '../store/hooks';

const ContentContainer = React.memo(() => {

  const userData = useAppSelector((state) => state.user);
  const selectedMenu = userData.selectedMenu;

  const getComponentToLoad = () => {
    switch (selectedMenu) {
      case 1: return <Home />;
      case 2: return <ApplyLoanStepper />;
      default: return <Home />;
    }
  };

  return (
    <div>
      <div className="sidebar-content">{getComponentToLoad()}</div>
    </div>
  );
});

export default ContentContainer;