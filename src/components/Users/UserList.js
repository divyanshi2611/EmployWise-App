import React, { useState } from 'react';
import useUsers from '../../hooks/useUsers';
import UserCard from './UserCard';
import Pagination from '../UI/Pagination';
import UserSearch from './UserSearch';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const UserList = () => {
  const {
    users,
    totalPages,
    currentPage,
    loading,
    error,
    setCurrentPage,
    deleteUser,
    searchTerm,
    setSearchTerm,
    refreshUsers,
  } = useUsers();

  const [deleteStatus, setDeleteStatus] = useState({ message: '', type: '' });
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const handleDelete = async (userId) => {
    const result = await deleteUser(userId);
    if (result.success) {
      setDeleteStatus({
        message: 'User deleted successfully!',
        type: 'success',
      });
    } else {
      setDeleteStatus({
        message: `Failed to delete user: ${result.error}`,
        type: 'error',
      });
    }
    setTimeout(() => setDeleteStatus({ message: '', type: '' }), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-sans">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-primary">Users</h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {deleteStatus.message && (
        <div
          className={`mb-5 p-4 rounded-xl font-medium text-sm ${
            deleteStatus.type === 'success'
              ? 'bg-green-50 text-green-800 border-l-4 border-green-500'
              : 'bg-red-50 text-red-800 border-l-4 border-red-500'
          }`}
        >
          {deleteStatus.message}
        </div>
      )}

      <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#4B0055]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-xl">
          {error}
        </div>
      ) : (
        <>
          {users.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm">No users found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {users.map((user) => (
                <UserCard key={user.id} user={user} onDelete={handleDelete} />
              ))}
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default UserList;
