import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUtensils, FaList, FaShoppingCart, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Add Item', to: '/', icon: <FaUtensils /> },
    { name: 'Manage Items', to: '/manage-items', icon: <FaList /> },
    { name: 'Orders', to: '/orders', icon: <FaShoppingCart /> },
    { name: 'Manage Chefs', to: '/manage-chefs', icon: <FaUserAlt /> }
  ];

  return (
    <nav className="bg-[#2D1B0E] border-b border-amber-900/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaUtensils className="text-amber-500 text-xl" />
            <span className="text-xl font-bold text-amber-400">Admin Panel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors ${
                  location.pathname === link.to
                    ? 'bg-amber-600 text-white'
                    : 'text-amber-100 hover:bg-amber-600/20'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-amber-100 hover:bg-amber-600/20 flex items-center transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-100 hover:text-amber-300 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                    location.pathname === link.to
                      ? 'bg-amber-600 text-white'
                      : 'text-amber-100 hover:bg-amber-600/20'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-amber-100 hover:bg-amber-600/20 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;