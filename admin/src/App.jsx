import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AddItem from './components/AddItem';
import ManageItems from './components/ManageItems';
import Orders from './components/Orders';
import ManageChefs from './components/ManageChefs';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#1a120b] to-[#3c2a21] text-amber-100">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
          <Route path="/manage-items" element={<ProtectedRoute><ManageItems /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/manage-chefs" element={<ProtectedRoute><ManageChefs /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
