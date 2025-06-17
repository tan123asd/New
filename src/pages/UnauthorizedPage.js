import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UnauthorizedPage.css';

const UnauthorizedPage = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-container">
        <div className="unauthorized-icon">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="#ff6b6b">
            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z" />
          </svg>
        </div>
        
        <h1>Access Denied</h1>
        <h2>403 - Unauthorized</h2>
        
        <p className="unauthorized-message">
          Sorry, you don't have permission to access this page.
        </p>
        
        <p className="unauthorized-details">
          You tried to access: <code>{from}</code>
        </p>
        
        <div className="unauthorized-actions">
          <Link to="/" className="btn btn-primary">
            Go to Home
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Login with Different Account
          </Link>
        </div>
        
        <div className="unauthorized-help">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
