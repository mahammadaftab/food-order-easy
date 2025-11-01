import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getMenuItems } from './services/menuService';
import SearchBar from './components/Search/SearchBar';
import PromotionalBanner from './components/Banner/PromotionalBanner';
import FeaturedCarousel from './components/Carousel/FeaturedCarousel';
import { AppContext } from './context/AppContext.jsx';
import { FaShoppingCart, FaUser, FaSearch, FaStar, FaFire, FaBolt, FaArrowRight, FaLeaf } from 'react-icons/fa';
import { GiChefToque, GiForkKnifeSpoon } from 'react-icons/gi';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredItems, setFeaturedItems] = useState([]);
  const { getCartItemCount } = useContext(AppContext);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load menu items
  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const data = await getMenuItems();
      setMenuItems(data.data);
      
      // Set featured items (popular or best sellers)
      const featured = data.data.filter(item => item.isPopular || item.isBestSeller);
      setFeaturedItems(featured);
      
      setLoading(false);
    } catch (err) {
      console.error('Failed to load menu items', err);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter menu items based on search and category
  const filteredItems = menuItems.filter(item => 
    (searchQuery ? 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) :
      true) &&
    (activeCategory === 'all' || item.category === activeCategory)
  );

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizer', name: 'Appetizers' },
    { id: 'main-course', name: 'Main Course' },
    { id: 'dessert', name: 'Desserts' },
    { id: 'beverage', name: 'Beverages' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a120b] to-[#3c2a21] text-amber-50">
      {/* Promotional Banner */}
      <PromotionalBanner />
      
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Delicious Food <span className="text-amber-400">Delivered</span> to You
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-amber-100/80">
              Experience the best culinary delights from our curated menu, delivered fresh to your doorstep in 30 minutes or less.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar onSearch={handleSearch} placeholder="Search for dishes, ingredients, or categories..." />
            </div>
          </div>
          
          {/* Featured Carousel */}
          <div className="mb-16">
            <FeaturedCarousel items={featuredItems} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden border-8 border-amber-900/30 shadow-2xl">
                {menuItems.length > 1 && (
                  <Link to={`/menu/${menuItems[1]._id}`}>
                    <img 
                      src={menuItems[1]?.image || ''} 
                      alt="Featured Dish" 
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  </Link>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-rose-500/20"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#2D1B0E] border-4 border-amber-600 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center">
                  {menuItems.length > 3 && (
                    <img 
                      src={menuItems[3]?.image || ''} 
                      alt="Chef's Special" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="ml-4">
                    <h3 className="font-bold">Chef's Special</h3>
                    {menuItems.length > 3 && (
                      <Link to={`/menu/${menuItems[3]._id}`} className="text-amber-400 text-sm hover:text-amber-300 transition-colors">
                        {menuItems[3]?.name || 'Chicken Chargha'}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
              <div className="space-y-6">
                {[
                  { 
                    icon: <FaBolt />, 
                    title: "Instant Delivery", 
                    text: "30-minute delivery guarantee in metro areas",
                    color: "from-amber-400 to-orange-500" 
                  },
                  { 
                    icon: <GiChefToque />, 
                    title: "Master Chefs", 
                    text: "Michelin-star trained culinary experts",
                    color: "from-rose-400 to-pink-600" 
                  },
                  { 
                    icon: <FaLeaf />, 
                    title: "Premium Quality", 
                    text: "Locally sourced organic ingredients",
                    color: "from-emerald-400 to-cyan-600" 
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`text-2xl mr-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-amber-100/80">{feature.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold relative">
              Our Delicious Menu
              <span className="absolute bottom-[-10px] left-0 w-24 h-1 bg-amber-500 rounded-full"></span>
            </h2>
            <Link to="/menu" className="flex items-center text-amber-400 hover:text-amber-300 transition-colors">
              View All Menu
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
          {/* Menu Items Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.slice(0, 4).map((item) => (
              <div key={item._id} className="bg-[#2D1B0E]/50 rounded-xl overflow-hidden border border-amber-900/30 hover:border-amber-600/50 transition-all group">
                <div className="relative overflow-hidden">
                  <Link to={`/menu/${item._id}`}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-48 object-cover cursor-pointer"
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {item.isPopular && (
                    <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                      Popular
                    </span>
                  )}
                  {item.isBestSeller && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                      Best Seller
                    </span>
                  )}
                  {item.isSpecial && (
                    <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                      Special
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <Link to={`/menu/${item._id}`} className="text-xl font-semibold hover:text-amber-400 transition-colors">
                      {item.name}
                    </Link>
                    <span className="text-amber-400 font-bold text-lg">₹{item.price}</span>
                  </div>
                  <p className="text-amber-100/80 text-sm mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaStar className="text-amber-400" />
                      <span className="ml-1 font-medium">{item.rating}</span>
                      <span className="text-amber-100/60 text-sm ml-2">({item.numOfReviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#2D1B0E] to-[#3c2a21] rounded-3xl p-12 border border-amber-900/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Order?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-amber-100/80">
              Join thousands of satisfied customers enjoying our delicious meals delivered fresh to their doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-900/30">
                Order Now
              </Link>
              <Link to="/contact" className="bg-transparent border-2 border-amber-600 text-amber-400 hover:bg-amber-600/20 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;