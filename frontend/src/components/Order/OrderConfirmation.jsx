import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';
import { FaCheckCircle, FaUtensils, FaTruck, FaHome, FaPrint } from 'react-icons/fa';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const data = await getOrderById(id);
      setOrder(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load order', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 px-4 flex justify-center items-center">
        <div className="text-amber-400 text-xl">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-24 pb-16 px-4 flex justify-center items-center">
        <div className="text-red-400 text-xl">Order not found</div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl text-amber-100/80">
            Thank you for your order. We're preparing your delicious meal.
          </p>
        </div>

        <div className="bg-[#2D1B0E]/50 rounded-xl border border-amber-900/30 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Order #{order._id.substring(0, 8)}</h2>
              <p className="text-amber-100/80">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <button className="flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors mt-4 md:mt-0">
              <FaPrint className="mr-2" />
              Print Receipt
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#3c2a21] p-4 rounded-xl">
              <h3 className="font-bold mb-2 flex items-center">
                <FaUtensils className="mr-2 text-amber-400" />
                Order Status
              </h3>
              <p className="text-green-400 font-medium">Confirmed</p>
            </div>
            
            <div className="bg-[#3c2a21] p-4 rounded-xl">
              <h3 className="font-bold mb-2 flex items-center">
                <FaTruck className="mr-2 text-amber-400" />
                Delivery Status
              </h3>
              <p className="text-yellow-400 font-medium">Preparing</p>
            </div>
            
            <div className="bg-[#3c2a21] p-4 rounded-xl">
              <h3 className="font-bold mb-2 flex items-center">
                <FaHome className="mr-2 text-amber-400" />
                Delivery Address
              </h3>
              <p className="text-amber-100/80">
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.orderItems.map((item, index) => (
              <div key={index} className="flex items-center border-b border-amber-900/30 pb-4 last:border-0 last:pb-0">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                <div className="flex-grow">
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-amber-100/80">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-amber-900/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-4">Payment Information</h3>
                <p className="mb-2">Payment Method: <span className="font-medium">{order.paymentMethod}</span></p>
                <p className="text-green-400 font-medium">Payment Status: Paid</p>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{order.itemsPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{order.taxPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{order.shippingPrice}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-amber-900/30">
                    <span>Total</span>
                    <span>₹{order.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-amber-100/80 mb-6">
            We'll send you an email confirmation with tracking information once your order is on the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/menu" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
            <Link 
              to="/profile" 
              className="bg-transparent border-2 border-amber-600 text-amber-400 hover:bg-amber-600/20 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;