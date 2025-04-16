import React, { createContext, useState, useEffect } from 'react';
import { isAuthenticated, logout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
  };

  const handleLogin = () => {
    setIsAuth(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        loading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
