import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'appetizer',
    image: '',
    isPopular: false,
    isBestSeller: false,
    isSpecial: false,
    rating: 0
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.post('http://localhost:5000/api/v1/menu', formData, config);
      
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'appetizer',
        image: '',
        isPopular: false,
        isBestSeller: false,
        isSpecial: false,
        rating: 0
      });
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to add menu item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#2D1B0E]/50 rounded-xl border border-amber-900/30 p-8">
          <h1 className="text-3xl font-bold mb-8">Add New Menu Item</h1>
          
          {success && (
            <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg mb-6">
              Menu item added successfully!
            </div>
          )}
          
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg bg-[#3c2a21] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3"
                />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg bg-[#3c2a21] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3"
                />
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-lg bg-[#3c2a21] text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3"
                >
                  <option value="appetizer">Appetizer</option>
                  <option value="main-course">Main Course</option>
                  <option value="dessert">Dessert</option>
                  <option value="beverage">Beverage</option>
                  <option value="special">Special</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 font-medium">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full rounded-lg bg-[#3c2a21] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full rounded-lg bg-[#3c2a21] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full rounded-lg bg-[#3c2a21] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 px-4 py-3"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={formData.isPopular}
                  onChange={handleInputChange}
                  className="rounded bg-[#3c2a21] border-amber-900/30 text-amber-600 focus:ring-amber-600 mr-2"
                />
                <span>Popular Item</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isBestSeller"
                  checked={formData.isBestSeller}
                  onChange={handleInputChange}
                  className="rounded bg-[#3c2a21] border-amber-900/30 text-amber-600 focus:ring-amber-600 mr-2"
                />
                <span>Best Seller</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isSpecial"
                  checked={formData.isSpecial}
                  onChange={handleInputChange}
                  className="rounded bg-[#3c2a21] border-amber-900/30 text-amber-600 focus:ring-amber-600 mr-2"
                />
                <span>Special Item</span>
              </label>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add To Menu'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;