import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddItem from './components/AddItem';
import ManageItems from './components/ManageItems';
import Orders from './components/Orders';
import Login from './components/Login';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#1a120b] to-[#3c2a21] text-amber-50">
        <Routes>
          <Route path="/login" element={
            isAuthenticated() ? <Navigate to="/" /> : <Login />
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <>
                <Navbar />
                <div className="pt-20">
                  <AddItem />
                </div>
              </>
            </ProtectedRoute>
          } />
          <Route path="/add-item" element={
            <ProtectedRoute>
              <>
                <Navbar />
                <AddItem />
              </>
            </ProtectedRoute>
          } />
          <Route path="/manage-items" element={
            <ProtectedRoute>
              <>
                <Navbar />
                <ManageItems />
              </>
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Orders />
              </>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;