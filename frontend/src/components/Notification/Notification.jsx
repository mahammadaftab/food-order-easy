import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext.jsx';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Notification = () => {
  const { error, setError } = useContext(AppContext);

  useEffect(() => {
    if (error) {
      // Auto dismiss error after 5 seconds
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-red-900/90 border border-red-700 text-white px-6 py-4 rounded-lg shadow-lg max-w-md flex items-start">
        <FaExclamationCircle className="text-red-400 text-xl mr-3 mt-0.5 flex-shrink-0" />
        <div className="flex-grow">
          <h4 className="font-bold">Error</h4>
          <p className="text-sm mt-1">{error}</p>
        </div>
        <button 
          onClick={() => setError(null)}
          className="text-red-300 hover:text-white ml-4"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Notification;