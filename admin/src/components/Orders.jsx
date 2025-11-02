import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTruck, FaCheck } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

      const res = await axios.get('http://localhost:5002/api/v1/orders', config);
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to load orders');
      setLoading(false);
    }
  };

  const handleMarkAsDelivered = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.put(`http://localhost:5002/api/v1/orders/${id}/deliver`, {}, config);
      
      // Update order status in state
      setOrders(orders.map(order => 
        order._id === id ? {...order, isDelivered: true, deliveredAt: res.data.data.deliveredAt} : order
      ));
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Failed to update order status');
    }
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
                        {order.isDelivered ? (
                          <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-sm">
                            Delivered
                          </span>
                        ) : order.isPaid ? (
                          <span className="bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full text-sm">
                            Paid
                          </span>
                        ) : (
                          <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded-full text-sm">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {!order.isDelivered && (
                          <button
                            onClick={() => handleMarkAsDelivered(order._id)}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm flex items-center transition-colors"
                          >
                            <FaTruck className="mr-1" />
                            Mark Delivered
                          </button>
                        )}
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