// Component to test and demonstrate routing functionality
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../services/api';
import { ROUTE_CONFIG, ROLES } from '../config/routes';

const RoutingTestComponent = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(ApiService.getCurrentUser());
  const [testResults, setTestResults] = useState({});

  // Mock login for testing different roles
  const mockLogin = (role) => {
    const mockUser = {
      email: `${role}@example.com`,
      fullname: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      role: role
    };
    
    localStorage.setItem('accessToken', 'mock-token-' + role);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setCurrentUser(mockUser);
    
    setTestResults(prev => ({
      ...prev,
      [`mockLogin_${role}`]: `✅ Logged in as ${role}`
    }));
  };

  // Test logout
  const testLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setCurrentUser(null);
    
    setTestResults(prev => ({
      ...prev,
      logout: '✅ Logged out successfully'
    }));
  };

  // Test route access
  const testRouteAccess = (route, description) => {
    try {
      navigate(route);
      setTestResults(prev => ({
        ...prev,
        [`route_${route}`]: `✅ Navigated to ${description}`
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [`route_${route}`]: `❌ Failed to navigate: ${error.message}`
      }));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🧪 Routing Test Component</h2>
      
      {/* Current User Status */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '5px', 
        marginBottom: '20px' 
      }}>
        <h3>Current User Status</h3>
        {currentUser ? (
          <div>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Name:</strong> {currentUser.fullname}</p>
            <p><strong>Role:</strong> {currentUser.role}</p>
            <p><strong>Token:</strong> {localStorage.getItem('accessToken')?.substring(0, 20)}...</p>
          </div>
        ) : (
          <p>❌ Not logged in</p>
        )}
      </div>

      {/* Mock Authentication */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🔐 Mock Authentication</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => mockLogin(ROLES.USER)}
            style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            Login as User
          </button>
          <button 
            onClick={() => mockLogin(ROLES.ADMIN)}
            style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            Login as Admin
          </button>
          <button 
            onClick={testLogout}
            style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Route Testing */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🛣️ Route Testing</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <h4>Public Routes</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <Link to={ROUTE_CONFIG.PUBLIC.HOME} style={{ padding: '5px 10px', background: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '3px' }}>
              Home
            </Link>
            <Link to={ROUTE_CONFIG.PUBLIC.EDUCATION} style={{ padding: '5px 10px', background: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '3px' }}>
              Education
            </Link>
            <Link to={ROUTE_CONFIG.PUBLIC.LOGIN} style={{ padding: '5px 10px', background: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '3px' }}>
              Login
            </Link>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4>Protected Routes</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <Link to={ROUTE_CONFIG.PROTECTED.DASHBOARD} style={{ padding: '5px 10px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '3px' }}>
              Dashboard
            </Link>
            <Link to={ROUTE_CONFIG.PROTECTED.COURSES} style={{ padding: '5px 10px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '3px' }}>
              Courses
            </Link>
            <Link to={ROUTE_CONFIG.PROTECTED.PROFILE} style={{ padding: '5px 10px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '3px' }}>
              Profile
            </Link>
            <Link to={ROUTE_CONFIG.PROTECTED.COUNSELING} style={{ padding: '5px 10px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '3px' }}>
              Counseling
            </Link>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4>Admin Routes</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
            <Link to={ROUTE_CONFIG.ADMIN.API_TEST} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', textDecoration: 'none', borderRadius: '3px' }}>
              API Test (Admin)
            </Link>
            <Link to={ROUTE_CONFIG.ADMIN.TEST_DB} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', textDecoration: 'none', borderRadius: '3px' }}>
              DB Test (Admin)
            </Link>
          </div>
        </div>
      </div>

      {/* Test Results */}
      <div>
        <h3>📊 Test Results</h3>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '5px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {Object.keys(testResults).length === 0 ? (
            <p>No tests run yet. Try the actions above.</p>
          ) : (
            Object.entries(testResults).map(([key, result]) => (
              <div key={key} style={{ marginBottom: '5px' }}>
                <strong>{key}:</strong> {result}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Navigation */}
      <div style={{ marginTop: '20px', padding: '15px', background: '#e9ecef', borderRadius: '5px' }}>
        <h4>🚀 Quick Actions</h4>
        <p>
          <strong>Test Flow:</strong>
        </p>
        <ol>
          <li>Start logged out and try accessing protected routes (should redirect to login)</li>
          <li>Login as User and try admin routes (should get unauthorized)</li>
          <li>Login as Admin and access all routes (should work)</li>
          <li>Logout and verify protection is restored</li>
        </ol>
      </div>
    </div>
  );
};

export default RoutingTestComponent;
