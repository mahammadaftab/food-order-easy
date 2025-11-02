import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getMenuItems } from './services/menuService';
import SearchBar from './components/Search/SearchBar';
import PromotionalBanner from './components/Banner/PromotionalBanner';
import FeaturedCarousel from './components/Carousel/FeaturedCarousel';
import { AppContext } from './context/AppContext.jsx';
import { FaShoppingCart, FaUser, FaSearch, FaStar, FaFire, FaBolt, FaArrowRight, FaLeaf, FaPlay, FaPause } from 'react-icons/fa';
import { GiChefToque, GiForkKnifeSpoon } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const { getCartItemCount } = useContext(AppContext);
  const videoRef = useRef(null);

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

  // Toggle video play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a120b] to-[#3c2a21] text-amber-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Delicious Food <span className="text-amber-400">Delivered</span> to You
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto text-amber-100/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience the best culinary delights from our curated menu, delivered fresh to your doorstep in 30 minutes or less.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <SearchBar onSearch={handleSearch} placeholder="Search for dishes, ingredients, or categories..." />
            </motion.div>
          </div>
          
          {/* Featured Carousel */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <FeaturedCarousel items={featuredItems} />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="relative">
                <div className="relative aspect-square rounded-3xl overflow-hidden border-8 border-amber-900/30 shadow-2xl">
                  {menuItems.length > 1 && (
                    <Link to={`/menu/${menuItems[1]._id}`}>
                      <motion.img 
                        src={menuItems[1]?.image || ''} 
                        alt="Featured Dish" 
                        className="w-full h-full object-cover cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-rose-500/20"></div>
                </div>
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-[#2D1B0E] border-4 border-amber-600 rounded-2xl p-4 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <div className="flex items-center">
                    {menuItems.length > 3 && (
                      <motion.img 
                        src={menuItems[3]?.image || ''} 
                        alt="Chef's Special" 
                        className="w-16 h-16 rounded-full object-cover"
                        whileHover={{ rotate: 10 }}
                        transition={{ duration: 0.3 }}
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
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
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
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className={`text-2xl mr-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-amber-100/80">{feature.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '10M+', label: 'Happy Customers', icon: <FaUser /> },
              { number: '98%', label: 'Satisfaction Rate', icon: <FaStar /> },
              { number: '500+', label: 'Cities Served', icon: <GiForkKnifeSpoon /> },
              { number: '24/7', label: 'Support Available', icon: <FaBolt /> }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#2D1B0E] to-[#3c2a21] border border-amber-900/30 hover:border-amber-600/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
                <p className="text-amber-100/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Delicious Menu
              <span className="absolute bottom-[-10px] left-0 w-24 h-1 bg-amber-500 rounded-full"></span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link to="/menu" className="flex items-center text-amber-400 hover:text-amber-300 transition-colors">
                View All Menu
                <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
          
          {/* Menu Items Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.slice(0, 4).map((item, index) => (
              <motion.div 
                key={item._id} 
                className="bg-[#2D1B0E]/50 rounded-xl overflow-hidden border border-amber-900/30 hover:border-amber-600/50 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden">
                  <Link to={`/menu/${item._id}`}>
                    <motion.img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-48 object-cover cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {item.isPopular && (
                    <motion.span 
                      className="absolute top-3 left-3 bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Popular
                    </motion.span>
                  )}
                  {item.isBestSeller && (
                    <motion.span 
                      className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Best Seller
                    </motion.span>
                  )}
                  {item.isSpecial && (
                    <motion.span 
                      className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Special
                    </motion.span>
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner - Moved here */}
      <section className="py-10 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <PromotionalBanner />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-500 rounded-full"></span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Food Blogger",
                text: "The quality and taste of the food exceeded my expectations. Fast delivery and excellent packaging!",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Michael Chen",
                role: "Chef",
                text: "As a professional chef, I appreciate the quality of ingredients and the skill in preparation.",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Emma Rodriguez",
                role: "Regular Customer",
                text: "I've been ordering for months now and the consistency is remarkable. Highly recommended!",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-[#2D1B0E]/50 p-8 rounded-xl border border-amber-900/30 hover:border-amber-600/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-amber-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-amber-100/80 italic">"{testimonial.text}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#2D1B0E] to-[#3c2a21] rounded-3xl p-12 border border-amber-900/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Order?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto text-amber-100/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of satisfied customers enjoying our delicious meals delivered fresh to their doorstep.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/menu" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-900/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Order Now
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border-2 border-amber-600 text-amber-400 hover:bg-amber-600/20 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;