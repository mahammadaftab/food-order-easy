import React from 'react';
import { FaRegEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { GiChefToque } from 'react-icons/gi';
import { socialIcons } from '../../assets/dummydata';

const Footer = () => {
  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Menu', link: '/menu' },
    { name: 'About Us', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'FAQ', link: '/faq' },
    { name: 'Privacy Policy', link: '/privacy' },
  ];

  return (
    <footer className="bg-[#2D1B0E] pt-16 pb-8 px-4 border-t-4 border-amber-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <GiChefToque className="text-2xl text-amber-500" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Food-Order-Easy
              </h3>
            </div>
            <p className="text-amber-100/80 mb-6">
              Delivering delicious meals with passion and quality since 2024. Experience the best culinary delights from our curated menu.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors text-xl"
                    style={{color: social.color}}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-amber-100/80 hover:text-amber-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3"></span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-amber-100/80">
              <li className="flex items-start">
                <FaRegEnvelope className="text-amber-400 mt-1 mr-3 flex-shrink-0" />
                <span>info@foodiefrenzy.com</span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-amber-400 mt-1 mr-3 flex-shrink-0" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-amber-400 mt-1 mr-3 flex-shrink-0" />
                <span>123 Food Street, Tasty City, FC 12345</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">Newsletter</h4>
            <p className="text-amber-100/80 mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-[#3c2a21] text-amber-50 placeholder-amber-400/70 px-4 py-3 rounded-l-lg outline-none w-full"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-r-lg transition-colors">
                Join
              </button>
            </div>
            <p className="text-amber-100/60 text-sm mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
        
        <div className="border-t border-amber-900/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-100/60 mb-4 md:mb-0">
              &copy; 2024 Foodie-Frenzy. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-amber-100/60 hover:text-amber-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-amber-100/60 hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-amber-100/60 hover:text-amber-400 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;