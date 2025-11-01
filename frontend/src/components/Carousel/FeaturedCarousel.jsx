import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaFire, FaCrown } from 'react-icons/fa';

const FeaturedCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && items.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative rounded-3xl overflow-hidden border-8 border-amber-900/30 shadow-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item._id} className="min-w-full relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a120b] to-transparent"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-md pl-12 pr-8">
                  <div className="flex items-center mb-4">
                    {item.isPopular && (
                      <span className="bg-amber-600 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center mr-2">
                        <FaFire className="mr-1" /> Popular
                      </span>
                    )}
                    {item.isBestSeller && (
                      <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center mr-2">
                        <FaCrown className="mr-1" /> Best Seller
                      </span>
                    )}
                    {item.isSpecial && (
                      <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                        Special
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-white">{item.name}</h3>
                  <p className="text-amber-100/90 mb-4">{item.description}</p>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-4">
                      <FaStar className="text-amber-400 mr-1" />
                      <span className="font-bold text-white">{item.rating}</span>
                    </div>
                    <span className="text-2xl font-bold text-amber-400">₹{item.price}</span>
                  </div>
                  <Link 
                    to={`/menu/${item._id}`} 
                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button 
            onClick={goToPrevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-amber-600/80 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={goToNextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-amber-600/80 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-amber-600' : 'bg-amber-900/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedCarousel;