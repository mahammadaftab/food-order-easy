import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTruck, FaCheck, FaEllipsisV, FaClock, FaBox } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.get('http://localhost:5001/api/v1/orders', config);
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to load orders');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      // Update order status using the new endpoint
      const res = await axios.put(`http://localhost:5001/api/v1/orders/${orderId}/status`, { status }, config);
      const updatedOrder = res.data.data;

      // Update order status in state
      setOrders(orders.map(order => 
        order._id === orderId ? updatedOrder : order
      ));
      
      // Close dropdown
      setDropdownOpen(null);
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Failed to update order status');
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-900/30 text-green-400';
      case 'Paid':
        return 'bg-blue-900/30 text-blue-400';
      case 'In Process':
        return 'bg-amber-900/30 text-amber-400';
      case 'Out of Delivery':
        return 'bg-purple-900/30 text-purple-400';
      default:
        return 'bg-yellow-900/30 text-yellow-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheck className="mr-1" />;
      case 'Paid':
        return <FaCheck className="mr-1" />;
      case 'In Process':
        return <FaClock className="mr-1" />;
      case 'Out of Delivery':
        return <FaTruck className="mr-1" />;
      default:
        return <FaClock className="mr-1" />;
    }
  };

  const getOrderStatus = (order) => {
    return order.status || (order.isDelivered ? 'Delivered' : order.isPaid ? 'Paid' : 'Pending');
  };

  if (loading) {
    return (
      <div className="pt-20 pb-16 px-4 flex justify-center items-center">
        <div className="text-amber-400 text-xl">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#2D1B0E]/50 rounded-xl border border-amber-900/30 p-8">
          <h1 className="text-3xl font-bold mb-8">Order Management</h1>
          
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-amber-100/80 text-xl">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-amber-900/30">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-amber-900/30 hover:bg-[#3c2a21]/30">
                      <td className="py-3 px-4">
                        <span className="font-mono">#{order._id.substring(0, 8)}</span>
                      </td>
                      <td className="py-3 px-4">
                        {order.user?.name || 'N/A'}
                        <p className="text-amber-100/80 text-sm">{order.user?.email || 'N/A'}</p>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-bold">₹{order.totalPrice}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusClass(getOrderStatus(order))}`}>
                          {getStatusIcon(getOrderStatus(order))}
                          {getOrderStatus(order)}
                        </span>
                      </td>
                      <td className="py-3 px-4 relative">
                        <div className="relative">
                          <button
                            onClick={() => setDropdownOpen(dropdownOpen === order._id ? null : order._id)}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm flex items-center transition-colors"
                          >
                            <FaEllipsisV className="mr-1" />
                            Actions
                          </button>
                          
                          {dropdownOpen === order._id && (
                            <div className="absolute right-0 mt-1 w-48 bg-[#2D1B0E] border border-amber-900/30 rounded-lg shadow-lg z-10">
                              <div className="py-1">
                                <button
                                  onClick={() => handleStatusUpdate(order._id, 'In Process')}
                                  className="block w-full text-left px-4 py-2 text-sm text-amber-100 hover:bg-amber-600/20 flex items-center"
                                >
                                  <FaClock className="mr-2 text-amber-400" />
                                  In Process
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(order._id, 'Out of Delivery')}
                                  className="block w-full text-left px-4 py-2 text-sm text-amber-100 hover:bg-amber-600/20 flex items-center"
                                >
                                  <FaTruck className="mr-2 text-amber-400" />
                                  Out of Delivery
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                                  className="block w-full text-left px-4 py-2 text-sm text-amber-100 hover:bg-amber-600/20 flex items-center"
                                >
                                  <FaCheck className="mr-2 text-amber-400" />
                                  Delivered
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;