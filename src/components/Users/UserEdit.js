import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useUsers from '../../hooks/useUsers';
import { ROUTES } from '../../utils/constants';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useUsers();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [updateStatus, setUpdateStatus] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data.data);
        setFormData({
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          email: response.data.data.email,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user details. Please try again.');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateUser(id, formData);

    if (result.success) {
      setUpdateStatus({
        message: 'User updated successfully!',
        type: 'success',
      });
      setTimeout(() => {
        navigate(ROUTES.USERS);
      }, 2000);
    } else {
      setUpdateStatus({
        message: `Failed to update user: ${result.error}`,
        type: 'error',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#4B0055]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 font-sans">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-xl mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate(ROUTES.USERS)}
          className="px-5 py-2 bg-primary text-white rounded-full hover:bg-buttonHover transition"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 font-sans">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-primary">Edit User</h2>
            <button
              onClick={() => navigate(ROUTES.USERS)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
            >
              Back
            </button>
          </div>

          {updateStatus.message && (
            <div
              className={`mb-5 p-4 rounded-xl font-medium text-sm ${
                updateStatus.type === 'success'
                  ? 'bg-green-50 text-green-800 border-l-4 border-green-500'
                  : 'bg-red-50 text-red-800 border-l-4 border-red-500'
              }`}
            >
              {updateStatus.message}
            </div>
          )}

          <div className="flex justify-center mb-6">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="h-28 w-28 rounded-full object-cover border-4 border-primary"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-full hover:bg-buttonHover transition"
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
