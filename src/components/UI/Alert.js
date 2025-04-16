import React from 'react';

const Alert = ({ message, type }) => {
  const baseClasses = 'p-4 mb-4 rounded-xl border-l-4 text-sm font-medium font-sans';
  const typeClasses = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
    info: 'bg-[#F3E5F5] border-[#C2185B] text-[#4B0055]', // soft pink with brand colors
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.info}`} role="alert">
      {message}
    </div>
  );
};

export default Alert;
