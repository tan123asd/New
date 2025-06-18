import React, { useState, useEffect } from 'react';
import FirebaseAuthService from '../services/firebaseAuth';

const AuthTest = () => {
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    firebaseUser: null
  });

  const checkAuthStatus = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const token = localStorage.getItem('accessToken');
    const firebaseUser = FirebaseAuthService.getCurrentUser();
    
    setAuthStatus({
      isAuthenticated: !!user && !!token,
      user,
      token: token ? `${token.substring(0, 20)}...` : null,
      firebaseUser
    });
  };

  useEffect(() => {
    checkAuthStatus();
    
    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('loginSuccess', handleAuthChange);
    return () => window.removeEventListener('loginSuccess', handleAuthChange);
  }, []);

  const handleLogin = async () => {
    try {
      // Test login with demo credentials
      await FirebaseAuthService.login('test@example.com', 'password123');
      checkAuthStatus();
    } catch (error) {
      console.error('Test login failed:', error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await FirebaseAuthService.logout();
      checkAuthStatus();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div style={{ 
      background: 'white', 
      padding: '1rem', 
      borderRadius: '8px', 
      margin: '1rem 0',
      border: '1px solid #ddd'
    }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>🔐 Authentication Test</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>Status:</strong> 
        <span style={{ 
          color: authStatus.isAuthenticated ? '#28a745' : '#dc3545',
          marginLeft: '0.5rem'
        }}>
          {authStatus.isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
        </span>
      </div>

      {authStatus.user && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>User:</strong> {authStatus.user.email || authStatus.user.name}
        </div>
      )}

      {authStatus.token && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>Token:</strong> {authStatus.token}
        </div>
      )}

      {authStatus.firebaseUser && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>Firebase User:</strong> {authStatus.firebaseUser.email}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={handleLogin}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Login
        </button>
        
        <button 
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
        
        <button 
          onClick={checkAuthStatus}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Refresh
        </button>
      </div>

      <details style={{ marginTop: '1rem' }}>
        <summary style={{ cursor: 'pointer', color: '#007bff' }}>View Raw Data</summary>
        <pre style={{ 
          fontSize: '0.75rem', 
          backgroundColor: '#f8f9fa', 
          padding: '0.5rem', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          {JSON.stringify(authStatus, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default AuthTest; 