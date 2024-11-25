import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;
