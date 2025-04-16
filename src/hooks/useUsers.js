import { useState, useEffect } from 'react';
import api from '../services/api';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/users?page=${page}`);
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      setUsers(
        users.map((user) => (user.id === id ? { ...user, ...response.data } : user))
      );
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    users: filteredUsers,
    totalPages,
    currentPage,
    loading,
    error,
    setCurrentPage,
    deleteUser,
    updateUser,
    searchTerm,
    setSearchTerm,
    refreshUsers: () => fetchUsers(currentPage),
  };
};

export default useUsers;