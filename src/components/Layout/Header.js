import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const Header = () => {
  const { isAuth, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm py-4 font-sans">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link
          to={isAuth ? ROUTES.USERS : ROUTES.LOGIN}
          className="flex items-center space-x-2 text-xl font-bold"
        >
          <img
            src="/assets/EmployWiselogo.jpg" 
            alt="EmployWise logo"
            className="h-6 w-auto"
          />
          <span>
            <span className="text-gray-700">Employ</span>
            <span className="text-purple-700">Wise</span>
          </span>
        </Link>

        {isAuth && (
          <button
            onClick={logout}
            className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
