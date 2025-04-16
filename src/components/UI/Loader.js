import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64 font-sans">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#4B0055] border-solid"></div>
    </div>
  );
};

export default Loader;
