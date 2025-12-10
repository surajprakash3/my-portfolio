import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProtectedRoute.css';

const ProtectedRoute = ({ children, isAuthenticated, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return children;
};

export default ProtectedRoute;
