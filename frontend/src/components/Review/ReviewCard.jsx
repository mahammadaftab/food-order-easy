import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-amber-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-amber-400" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="bg-[#2D1B0E]/50 rounded-xl border border-amber-900/30 p-6 hover:border-amber-600/50 transition-all">
      <div className="flex items-center mb-4">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 rounded-full mr-4" />
        <div>
          <h4 className="font-bold">{review.user}</h4>
          <div className="flex items-center">
            <div className="flex mr-2">
              {renderStars(review.rating)}
            </div>
            <span className="text-amber-100/80 text-sm">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-amber-100/80">{review.comment}</p>
      {review.item && (
        <div className="mt-4 pt-4 border-t border-amber-900/30">
          <p className="text-amber-400 text-sm">Ordered: {review.item}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;