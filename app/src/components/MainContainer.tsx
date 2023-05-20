import React from 'react';
import Sidebar from './Sidebar';
import ContentContainer from './ContentContainer';

const MainContainer = () => {
  return (
    <div>
      <Sidebar />
      <ContentContainer />
    </div>
  );
};

export default MainContainer;