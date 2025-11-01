import React, { useState } from 'react';
import { FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn, FaQuoteLeft } from 'react-icons/fa';
import TestimonialSlider from '../Testimonial/TestimonialSlider';
import { features, stats, teamMembers } from '../../assets/dummydata';

const About = () => {
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div className="pt-24 pb-16 px-4">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-amber-400">Story</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-amber-100/80 mb-12">
            Founded in 2024, Food-Order-Easy began with a simple mission: to deliver exceptional culinary experiences to food lovers everywhere.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative rounded-3xl overflow-hidden border-8 border-amber-900/30 shadow-2xl">
                <img 
                  src={teamMembers[0]?.img || ''} 
                  alt="Our Restaurant" 
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-6">From Passion to Plate</h2>
              <p className="text-amber-100/80 mb-6">
                What started as a small kitchen experiment has blossomed into a thriving food delivery service. Our journey began when our founder, Marco Yansen, realized that exceptional food shouldn't be confined to restaurant walls.
              </p>
              <p className="text-amber-100/80 mb-6">
                Today, we partner with over 200 local restaurants and employ 50+ delivery professionals to ensure that every meal reaches you in perfect condition, exactly when you need it.
              </p>
              <div className="flex items-center">
                <img 
                  src={teamMembers[0]?.img || ''} 
                  alt="Marco Yansen" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="font-bold">Marco Yansen</h3>
                  <p className="text-amber-400">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#2D1B0E]/30 rounded-3xl my-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#2D1B0E] to-[#3c2a21] border border-amber-900/30 hover:border-amber-600/50 transition-all"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.gradient} mb-4 transition-transform ${hoveredStat === index ? 'scale-110' : ''}`}>
                  <stat.icon className="text-white text-xl" />
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
                <p className="text-amber-100/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why We Stand Out</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-[#2D1B0E]/50 p-8 rounded-xl border border-amber-900/30 hover:border-amber-600/50 transition-all group hover:-translate-y-2"
              >
                <div className="text-amber-400 text-3xl mb-6 group-hover:text-amber-300 transition-colors">
                  <feature.icon />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-amber-100/80">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Meet Our Culinary Masters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-[#2D1B0E]/50 rounded-xl overflow-hidden border border-amber-900/30 hover:border-amber-600/50 transition-all group">
                <div className="relative">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a120b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-amber-400 mb-4">{member.role}</p>
                  <p className="text-amber-100/80 mb-6">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    {Object.entries(member.social).map(([platform, url]) => {
                      const Icon = {
                        twitter: FaTwitter,
                        instagram: FaInstagram,
                        facebook: FaFacebookF,
                        linkedin: FaLinkedinIn
                      }[platform] || FaFacebookF;
                      
                      return (
                        <a 
                          key={platform} 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <Icon className="text-xl" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
          <TestimonialSlider />
        </div>
      </section>
    </div>
  );
};

export default About;