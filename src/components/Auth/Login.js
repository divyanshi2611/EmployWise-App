import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      setAuth();
      navigate(ROUTES.USERS);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center font-sans">
      <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">
          Sign in to EmployWise
        </h2>
        {error && (
          <div className="bg-red-100 text-red-800 border-l-4 border-red-500 p-4 mb-4 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-full font-semibold hover:bg-buttonHover transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <p className="text-xs text-center text-gray-500">
            Test credentials:<br />
            Email: eve.holt@reqres.in<br />
            Password: cityslicka
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
