import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUtensils, FaPlus, FaList, FaShoppingBag } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="bg-[#1a120b] border-b-2 border-amber-900/30 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FaUtensils className="text-amber-400 text-2xl mr-2" />
              <span className="text-xl font-bold text-amber-400">Admin Panel</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/add-item" 
              className="flex items-center text-amber-100 hover:text-amber-400 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Item
            </Link>
            <Link 
              to="/manage-items" 
              className="flex items-center text-amber-100 hover:text-amber-400 transition-colors"
            >
              <FaList className="mr-2" />
              Manage Items
            </Link>
            <Link 
              to="/orders" 
              className="flex items-center text-amber-100 hover:text-amber-400 transition-colors"
            >
              <FaShoppingBag className="mr-2" />
              Orders
            </Link>
            <button
              onClick={handleLogout}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;