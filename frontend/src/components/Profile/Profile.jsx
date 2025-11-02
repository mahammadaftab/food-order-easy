import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { getMyOrders } from '../../services/orderService';
import { updateProfile } from '../../services/userService';
import { FaUser, FaShoppingBag, FaCalendar, FaRupeeSign, FaCheckCircle, FaTruck, FaClock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { user, logout, loadUser } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      loadOrders();
      // Initialize edit data with current user info
      setEditData({
        name: user.name,
        email: user.email
      });
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load orders', err);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({
      name: user.name,
      email: user.email
    });
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
      await updateProfile(editData);
      // Refresh user data in context
      await loadUser();
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get order status style
  const getOrderStatusStyle = (status) => {
    switch (status) {
      case 'delivered':
        return { color: 'text-green-400', bg: 'bg-green-900/20', icon: <FaCheckCircle /> };
      case 'shipped':
        return { color: 'text-blue-400', bg: 'bg-blue-900/20', icon: <FaTruck /> };
      default:
        return { color: 'text-yellow-400', bg: 'bg-yellow-900/20', icon: <FaClock /> };
    }
  };

  if (!user) {
    return (
      <div className="pt-24 pb-16 px-4 flex justify-center items-center">
        <div className="text-amber-400 text-xl">Please login to view your profile</div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-[#2D1B0E]/50 rounded-xl border border-amber-900/30 p-6 sticky top-28">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 rounded-full" />
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-amber-400 text-sm">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === 'profile'
                      ? 'bg-amber-600/30 text-amber-400'
                      : 'text-amber-100 hover:bg-amber-600/20'
                  }`}
                >
                  <FaUser className="mr-3" />
                  My Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeTab === 'orders'
                      ? 'bg-amber-600/30 text-amber-400'
                      : 'text-amber-100 hover:bg-amber-600/20'
                  }`}
                >
                  <FaShoppingBag className="mr-3" />
                  My Orders
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center text-amber-100 hover:bg-amber-600/20"
                >
                  <FaUser className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {activeTab === 'profile' && (
              <div className="bg-[#2D1B0E]/50 rounded-xl border border-amber-900/30 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">My Profile</h2>
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
                          {user.role === 'admin' ? 'Administrator' : 'Customer'}
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
                        {user.role === 'admin' ? 'Administrator' : 'Customer'}
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
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-[#2D1B0E]/50 rounded-xl border border-amber-900/30 p-6">
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                
                {loading ? (
                  <div className="text-center py-8">
                    <div className="text-amber-400">Loading orders...</div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-amber-400 mb-4">No orders found</div>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => {
                      const statusStyle = getOrderStatusStyle(order.isDelivered ? 'delivered' : order.isPaid ? 'shipped' : 'pending');
                      return (
                        <div key={order._id} className="border border-amber-900/30 rounded-xl p-6">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                            <div>
                              <h3 className="font-bold">Order #{order._id.substring(0, 8)}</h3>
                              <p className="text-amber-100/80 text-sm">{formatDate(order.createdAt)}</p>
                            </div>
                            <div className={`flex items-center px-3 py-1 rounded-full ${statusStyle.bg} ${statusStyle.color}`}>
                              <span className="mr-2">{statusStyle.icon}</span>
                              {order.isDelivered ? 'Delivered' : order.isPaid ? 'Shipped' : 'Processing'}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-amber-100/80 text-sm">Total Items</p>
                              <p className="font-bold">{order.orderItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
                            </div>
                            <div>
                              <p className="text-amber-100/80 text-sm">Total Amount</p>
                              <p className="font-bold flex items-center">
                                <FaRupeeSign className="text-sm" />
                                {order.totalPrice}
                              </p>
                            </div>
                            <div>
                              <p className="text-amber-100/80 text-sm">Payment Method</p>
                              <p className="font-bold">{order.paymentMethod}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-amber-100/80 text-sm mb-2">Items</p>
                            <div className="flex flex-wrap gap-2">
                              {order.orderItems.slice(0, 3).map((item, index) => (
                                <span key={index} className="bg-[#3c2a21] px-3 py-1 rounded-full text-sm">
                                  {item.name} x {item.quantity}
                                </span>
                              ))}
                              {order.orderItems.length > 3 && (
                                <span className="bg-[#3c2a21] px-3 py-1 rounded-full text-sm">
                                  +{order.orderItems.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;