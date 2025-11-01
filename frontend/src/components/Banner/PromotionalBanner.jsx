import React from 'react';
import { FaBolt, FaGift, FaPercent } from 'react-icons/fa';

const PromotionalBanner = () => {
  const promotions = [
    {
      icon: <FaBolt />,
      title: "Flash Sale",
      description: "50% off on all appetizers today only!",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <FaGift />,
      title: "Free Delivery",
      description: "On orders above ₹500",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaPercent />,
      title: "Loyalty Points",
      description: "Earn 10 points for every ₹100 spent",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-[#2D1B0E] to-[#3c2a21] border-y border-amber-900/30 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br rounded-xl p-5 border border-amber-900/30 hover:border-amber-600/50 transition-all group"
            >
              <div className="flex items-start">
                <div className={`text-xl p-3 rounded-lg bg-gradient-to-r ${promo.color} mr-4`}>
                  {promo.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{promo.title}</h3>
                  <p className="text-amber-100/80">{promo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;