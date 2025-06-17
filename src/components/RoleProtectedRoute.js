import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const userString = localStorage.getItem('user');
  
  // Check if user is authenticated
  if (!token || !userString) {
    console.log('RoleProtectedRoute: No token or user found, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check role-based access
  try {
    const user = JSON.parse(userString);
    
    if (!user.role) {
      console.log('RoleProtectedRoute: User has no role assigned');
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
    
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      console.log(`RoleProtectedRoute: User role '${user.role}' not in allowed roles [${allowedRoles.join(', ')}]`);
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
    
    console.log(`RoleProtectedRoute: Access granted for role '${user.role}'`);
    return children;
  } catch (error) {
    console.error('RoleProtectedRoute: Error parsing user data:', error);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RoleProtectedRoute;
