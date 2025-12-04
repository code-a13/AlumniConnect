import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // If there is no token, force them to go to Login page
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;