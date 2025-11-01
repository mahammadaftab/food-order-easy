import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getMenuItemById } from '../../services/menuService';
import { AppContext } from '../../context/AppContext.jsx';
import ReviewCard from '../Review/ReviewCard';
import AddReview from '../Review/AddReview';
import { FaStar, FaShoppingCart, FaPlus, FaMinus, FaArrowLeft, FaFire, FaCrown, FaHeart } from 'react-icons/fa';

const MenuItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, user } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([
    {
      user: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely delicious! The flavors were incredible and the presentation was beautiful. Will definitely order again.",
      date: "2023-05-15",
      item: "Chicken Tikka"
    },
    {
      user: "Michael Chen",
      rating: 4,
      comment: "Great taste and quick delivery. The chicken was tender and well-seasoned. Only reason for 4 stars is the portion could be slightly larger.",
      date: "2023-05-10",
      item: "Chicken Tikka"
    },
    {
      user: "Emma Rodriguez",
      rating: 5,
      comment: "This is now my favorite dish! The spices were perfectly balanced and the meat was so juicy. Highly recommend!",
      date: "2023-05-05",
      item: "Chicken Tikka"
    }
  ]);

  useEffect(() => {
    loadMenuItem();
  }, [id]);

  const loadMenuItem = async () => {
    try {
      setLoading(true);
      const data = await getMenuItemById(id);
      setItem(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Addons data
  const addons = [
    { id: 1, name: 'Extra Cheese', price: 20 },
    { id: 2, name: 'Extra Spicy', price: 10 },
    { id: 3, name: 'Extra Sauce', price: 15 },
    { id: 4, name: 'Grilled Chicken', price: 50 }
  ];

  // Size options
  const sizes = [
    { id: 'small', name: 'Small', priceModifier: -20 },
    { id: 'medium', name: 'Medium', priceModifier: 0 },
    { id: 'large', name: 'Large', priceModifier: 30 }
  ];

  // Handle addon selection
  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const isSelected = prev.some(a => a.id === addon.id);
      if (isSelected) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  // Calculate total price
  const basePrice = item?.price || 0;
  const sizePrice = sizes.find(s => s.id === selectedSize)?.priceModifier || 0;
  const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const totalPrice = (basePrice + sizePrice + addonsPrice) * quantity;

  // Handle add to cart
  const handleAddToCart = () => {
    const cartItem = {
      ...item,
      selectedSize,
      selectedAddons,
      quantity
    };
    addToCart(cartItem);
    alert('Item added to cart!');
  };

  // Handle review submission
  const handleReviewSubmit = (reviewData) => {
    const newReview = {
      user: user?.name || 'Anonymous',
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toLocaleDateString(),
      item: item?.name
    };
    
    setReviews(prev => [newReview, ...prev]);
    alert('Thank you for your review!');
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 px-4 flex justify-center items-center">
        <div className="text-amber-400 text-xl">Loading item details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 px-4 flex justify-center items-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="pt-24 pb-16 px-4 flex justify-center items-center">
        <div className="text-amber-400 text-xl">Item not found</div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/menu')}
          className="flex items-center text-amber-400 hover:text-amber-300 transition-colors mb-8"
        >
          <FaArrowLeft className="mr-2" />
          Back to Menu
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Item Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border-8 border-amber-900/30 shadow-2xl">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Badges */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              {item.isPopular && (
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full font-bold flex items-center">
                  <FaFire className="mr-1" /> Popular
                </span>
              )}
              {item.isBestSeller && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold flex items-center">
                  <FaCrown className="mr-1" /> Best Seller
                </span>
              )}
              {item.isSpecial && (
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full font-bold">
                  Special
                </span>
              )}
            </div>
          </div>

          {/* Item Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <FaStar className="text-amber-400 mr-1" />
                  <span className="font-bold">{item.rating}</span>
                  <span className="text-amber-100/60 ml-1">({item.numOfReviews} reviews)</span>
                </div>
              </div>
              
              <p className="text-amber-100/80 text-lg mb-6">{item.description}</p>
              
              <div className="text-3xl font-bold text-amber-400">
                ₹{basePrice}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Choose Size</h3>
              <div className="grid grid-cols-3 gap-4">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedSize === size.id
                        ? 'border-amber-600 bg-amber-600/20'
                        : 'border-amber-900/30 hover:border-amber-600/50'
                    }`}
                  >
                    <div className="font-bold">{size.name}</div>
                    {size.priceModifier !== 0 && (
                      <div className="text-sm text-amber-400">
                        {size.priceModifier > 0 ? '+' : ''}₹{Math.abs(size.priceModifier)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Addons Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Add-ons</h3>
              <div className="grid grid-cols-2 gap-4">
                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedAddons.some(a => a.id === addon.id)
                        ? 'border-amber-600 bg-amber-600/20'
                        : 'border-amber-900/30 hover:border-amber-600/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{addon.name}</span>
                      <span className="text-amber-400">₹{addon.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-[#2D1B0E]/50 rounded-2xl p-6 border border-amber-900/30">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Quantity</span>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-[#3c2a21] text-amber-400 flex items-center justify-center hover:bg-amber-600/30 transition-colors"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-4 w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-[#3c2a21] text-amber-400 flex items-center justify-center hover:bg-amber-600/30 transition-colors"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg">Total Price</span>
                <span className="text-2xl font-bold text-amber-400">₹{totalPrice}</span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center">
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            </div>
            
            <div>
              <AddReview onSubmit={handleReviewSubmit} />
            </div>
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* For now, we'll show some placeholder items */}
            <div className="text-amber-100/80 text-center py-8">
              Related items will appear here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;