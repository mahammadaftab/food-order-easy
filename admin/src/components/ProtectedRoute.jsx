import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Verify token with backend
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        await axios.get('http://localhost:5001/api/v1/auth/me', config);
        setLoading(false);
      } catch (error) {
        // Token is invalid, redirect to login
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="pt-20 pb-16 px-4 flex justify-center items-center">
        <div className="text-amber-400 text-xl">Loading...</div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;