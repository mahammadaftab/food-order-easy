import React, { useState, useEffect } from 'react';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.get('http://localhost:5001/api/v1/auth/me', config);
      setUser(res.data.data);
      setEditData({
        name: res.data.data.name,
        email: res.data.data.email
      });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to load user profile');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({
      name: user.name,
      email: user.email
    });
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      name: user.name,
      email: user.email
    });
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.put('http://localhost:5001/api/v1/auth/me', editData, config);
      
      setUser(res.data.data);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to update profile');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 px-4 flex justify-center items-center">
        <div className="text-amber-400 text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-24 pb-16 px-4 flex justify-center items-center">
        <div className="text-amber-400 text-xl">Please login to view your profile</div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#2D1B0E]/50 rounded-xl border border-amber-900/30 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>
          
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}
          
          {isEditing ? (
            <form onSubmit={handleSaveProfile}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-amber-100/80">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#3c2a21] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-amber-100/80">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#3c2a21] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-amber-100/80">Member Since</label>
                  <div className="bg-[#3c2a21] px-4 py-3 rounded-lg">
                    {formatDate(user.createdAt)}
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 text-amber-100/80">Account Type</label>
                  <div className="bg-[#3c2a21] px-4 py-3 rounded-lg">
                    {user.role === 'admin' ? 'Admin' : 'Customer'}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="submit"
                  className="flex items-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <FaSave className="mr-2" />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex items-center bg-transparent border border-amber-600 text-amber-400 hover:bg-amber-600/20 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <FaTimes className="mr-2" />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-amber-100/80">Full Name</label>
                <div className="bg-[#3c2a21] px-4 py-3 rounded-lg">
                  {user.name}
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-amber-100/80">Email Address</label>
                <div className="bg-[#3c2a21] px-4 py-3 rounded-lg">
                  {user.email}
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-amber-100/80">Member Since</label>
                <div className="bg-[#3c2a21] px-4 py-3 rounded-lg">
                  {formatDate(user.createdAt)}
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-amber-100/80">Account Type</label>
                <div className="bg-[#3c2a21] px-4 py-3 rounded-lg">
                  {user.role === 'admin' ? 'Admin' : 'Customer'}
                </div>
              </div>
            </div>
          )}
          
          {!isEditing && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Account Settings</h3>
              <div className="space-y-4">
                <button className="w-full md:w-auto bg-transparent border border-amber-600 text-amber-400 hover:bg-amber-600/20 px-6 py-3 rounded-lg font-medium transition-colors">
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;