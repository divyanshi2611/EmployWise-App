import React from 'react';

const UserSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 font-sans">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </div>
  );
};

export default UserSearch;
