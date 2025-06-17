import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const userString = localStorage.getItem('user');
  
  // Check if user is authenticated
  if (!token || !userString) {
    console.log('ProtectedRoute: No token or user found, redirecting to login');
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check role-based access if required
  if (requiredRole) {
    try {
      const user = JSON.parse(userString);
      if (!user.role || user.role !== requiredRole) {
        console.log(`ProtectedRoute: User role '${user.role}' does not match required '${requiredRole}'`);
        // Redirect to unauthorized page or home
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
      }
    } catch (error) {
      console.error('ProtectedRoute: Error parsing user data:', error);
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;
