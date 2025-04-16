import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const UserCard = ({ user, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}?`)) {
      onDelete(user.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden font-sans">
      <div className="flex justify-center p-6">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="h-28 w-28 rounded-full object-cover border-4 border-primary"
        />
      </div>
      <div className="px-6 pb-6 text-center">
        <h3 className="text-lg font-semibold text-primary">
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-sm text-gray-600">{user.email}</p>
        <div className="mt-5 flex justify-center gap-3">
          <Link
            to={ROUTES.EDIT_USER.replace(':id', user.id)}
            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-buttonHover transition"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
