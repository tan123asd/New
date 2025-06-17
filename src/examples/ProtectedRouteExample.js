// Example of using ProtectedRoute in App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/" element={<HomePage />} />
          
          {/* Protected routes - require authentication */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin-only routes - require admin role */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          
          {/* More protected routes */}
          <Route 
            path="/surveys" 
            element={
              <ProtectedRoute>
                <SurveysPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/courses" 
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/*
ProtectedRoute Usage Examples:

1. Basic Protection (requires login):
   <ProtectedRoute>
     <YourComponent />
   </ProtectedRoute>

2. Role-based Protection (requires specific role):
   <ProtectedRoute requiredRole="admin">
     <AdminComponent />
   </ProtectedRoute>

3. Multiple role protection (extend component if needed):
   <ProtectedRoute requiredRole="admin">
     <AdminOnlyPage />
   </ProtectedRoute>

Features:
- ✅ Checks for accessToken and user in localStorage
- ✅ Redirects to login with return URL
- ✅ Supports role-based access control
- ✅ Redirects to unauthorized page for insufficient permissions
- ✅ Proper error handling for corrupted user data
- ✅ Console logging for debugging
*/
