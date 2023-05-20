import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export const LoadingSpinner = () => {
    return (
      <div className="loading-spinner">
        <ClipLoader color="darkcyan" loading={true} size={200} />
      </div>
    );
  };
  