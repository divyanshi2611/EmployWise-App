import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPageDisplay = 5;

  if (totalPages <= maxPageDisplay) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  return (
    <nav className="flex justify-center mt-6 font-sans">
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-primary hover:bg-buttonHover hover:text-white'
            }`}
          >
            Previous
          </button>
        </li>

        {pageNumbers.map((number, index) => (
          <li key={index}>
            {number === '...' ? (
              <span className="px-4 py-2 text-gray-400">...</span>
            ) : (
              <button
                onClick={() => onPageChange(number)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  currentPage === number
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-300 text-primary hover:bg-buttonHover hover:text-white'
                }`}
              >
                {number}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-primary hover:bg-buttonHover hover:text-white'
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
