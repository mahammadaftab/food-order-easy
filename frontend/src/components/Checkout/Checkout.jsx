import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.jsx';
import { createOrder } from '../../services/orderService';
import { FaArrowLeft, FaLock, FaCreditCard, FaPaypal, FaApplePay } from 'react-icons/fa';

const Checkout = () => {
  const { user, cartItems, getCartTotal, clearCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India'
  });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Prepare order data
      const orderData = {
        orderItems: cartItems.map(item => ({
          menuItem: item._id || item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice: getCartTotal(),
        taxPrice: getCartTotal() * 0.1,
        shippingPrice: 50,
        totalPrice: getCartTotal() + (getCartTotal() * 0.1) + 50
      };
      
      // Create order
      const order = await createOrder(orderData);
      
      // Clear cart
      clearCart();
      
      // Redirect to order confirmation
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      console.error('Failed to create order', err);
      alert('Failed to process order. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <FaArrowLeft className="text-amber-400 mr-2" />
          <Link to="/cart" className="text-amber-400 hover:text-amber-300 transition-colors">Back to Cart</Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#2D1B0E]/50 rounded-xl border border-amber-900/30 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label className="block mb-2 font-medium">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleAddressChange}
                      required
                      className="w-full rounded-lg bg-[#3c2a21] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3"
                      placeholder="123 Main Street"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      required
                      className="w-full rounded-lg bg-[#3c2a21] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3"
                      placeholder="New York"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={handleAddressChange}
                      required
                      className="w-full rounded-lg bg-[#3c2a21] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3"
                      placeholder="10001"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block mb-2 font-medium">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleAddressChange}
                      required
                      className="w-full rounded-lg bg-[#3c2a21] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3"
                      placeholder="United States"
                    />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    paymentMethod === 'Credit Card' 
                      ? 'border-amber-600 bg-amber-600/20' 
                      : 'border-amber-900/30 hover:border-amber-600/50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit Card"
                      checked={paymentMethod === 'Credit Card'}
                      onChange={() => setPaymentMethod('Credit Card')}
                      className="hidden"
                    />
                    <div className="flex items-center">
                      <FaCreditCard className="text-2xl mr-3 text-amber-400" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                  </label>
                  
                  <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    paymentMethod === 'PayPal' 
                      ? 'border-amber-600 bg-amber-600/20' 
                      : 'border-amber-900/30 hover:border-amber-600/50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === 'PayPal'}
                      onChange={() => setPaymentMethod('PayPal')}
                      className="hidden"
                    />
                    <div className="flex items-center">
                      <FaPaypal className="text-2xl mr-3 text-amber-400" />
                      <span className="font-medium">PayPal</span>
                    </div>
                  </label>
                  
                  <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    paymentMethod === 'Apple Pay' 
                      ? 'border-amber-600 bg-amber-600/20' 
                      : 'border-amber-900/30 hover:border-amber-600/50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Apple Pay"
                      checked={paymentMethod === 'Apple Pay'}
                      onChange={() => setPaymentMethod('Apple Pay')}
                      className="hidden"
                    />
                    <div className="flex items-center">
                      <FaApplePay className="text-2xl mr-3 text-amber-400" />
                      <span className="font-medium">Apple Pay</span>
                    </div>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-lg font-bold transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : (
                    <>
                      <FaLock className="mr-2" />
                      Place Order
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-[#2D1B0E]/50 rounded-xl border border-amber-900/30 p-6 sticky top-28">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id || item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-amber-100/80 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold">₹{item.price * item.quantity}</p>
                  </div>
                ))}
                
                <div className="border-t border-amber-900/30 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{(getCartTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹50.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span>₹{(getCartTotal() + (getCartTotal() * 0.1) + 50).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-900/20 rounded-xl p-4">
                <h3 className="font-bold mb-2">Secure Checkout</h3>
                <p className="text-amber-100/80 text-sm">
                  Your payment information is securely encrypted and processed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;