import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import ApiService from '../services/api';
import './Header.css'; // Import the dedicated CSS file

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserProfile = async () => {
    try {
      const response = await ApiService.getProfile();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);      // Still set logged in as true if we have a token
      const token = localStorage.getItem('accessToken');
      if (token) {
        setUser({ name: 'User', email: 'user@example.com' });
      }
    }
  };
  // Function to check authentication status
  const checkAuthStatus = () => {
    // Check both possible token keys for debugging
    const token = localStorage.getItem('accessToken') || localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    console.log('Header checkAuthStatus - checking auth:'); // Debug log
    console.log('accessToken found:', !!localStorage.getItem('accessToken')); // Debug log
    console.log('authToken found:', !!localStorage.getItem('authToken')); // Debug log
    console.log('Token found:', !!token); // Debug log
    console.log('User data found:', !!userData); // Debug log
    console.log('Current location:', location.pathname); // Debug log
    
    if (token) {
      console.log('Setting isLoggedIn to true'); // Debug log
      setIsLoggedIn(true);
      
      if (userData) {
        try {
          const user = JSON.parse(userData);
          console.log('Setting user:', user); // Debug log
          setUser(user);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      
      fetchUserProfile();
    } else {
      console.log('No token found, staying logged out'); // Debug log
      setIsLoggedIn(false);
      setUser(null);
    }
  };
  useEffect(() => {
    checkAuthStatus();
  }, [location.pathname]); // Re-check when route changes

  // Listen for custom login event
  useEffect(() => {
    const handleLoginSuccess = () => {
      console.log('Login success event received, rechecking auth status');
      setTimeout(() => {
        checkAuthStatus();
      }, 100);
    };

    window.addEventListener('loginSuccess', handleLoginSuccess);
    return () => window.removeEventListener('loginSuccess', handleLoginSuccess);
  }, []);

  // Debug log for render
  console.log('Header render - isLoggedIn:', isLoggedIn, 'user:', user);

  const handleLogout = async () => {
    try {
      await ApiService.logout();
      setIsLoggedIn(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <img src="/Dlogo.jpg" alt="Drug Free" className="header-logo-img" />
            <span className="header-logo-text">Drug Free</span>
          </Link>          {/* Desktop Navigation */}
          <nav className="header-nav">
            <Link to="/" className="header-nav-link">
              Home
            </Link>
            <Link to="/education" className="header-nav-link">
              Education
            </Link>
            <Link to="/courses" className="header-nav-link">
              Courses
            </Link>
            <Link to="/programs" className="header-nav-link">
              Programs
            </Link>
            <Link to="/counseling" className="header-nav-link">
              Counseling
            </Link>
            {/* Temporarily show Assessment for all users */}
            <Link to="/assessment" className="header-nav-link">
              Assessment
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/dashboard" className="header-nav-link">
                  Dashboard
                </Link>                {process.env.NODE_ENV === 'development' && (
                  <>
                    <Link to="/test-db" className="header-nav-link dev-link">
                      DB Test
                    </Link>
                    <Link to="/api-test" className="header-nav-link dev-link">
                      API Test
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="header-user-menu">
            {isLoggedIn ? (
              <div className="header-user-menu">
                <Link to="/profile" className="header-profile-link">
                  <FaUser />
                  <span>{user?.name || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="header-btn header-btn-danger"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="header-btn header-btn-primary"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="header-mobile-btn"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="header-mobile-nav">
            <div className="header-mobile-nav-content">
              <Link
                to="/"
                className="header-mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/education"
                className="header-mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Education
              </Link>
              <Link
                to="/courses"
                className="header-mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/programs"
                className="header-mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Programs
              </Link>              <Link
                to="/counseling"
                className="header-mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Counseling
              </Link>
              {/* Temporarily show Assessment for all users */}
              <Link
                to="/assessment"
                className="header-mobile-nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Assessment
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    to="/dashboard"
                    className="header-mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="header-mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              )}
              <div className="header-mobile-nav-divider">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="header-btn header-btn-danger"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="header-btn header-btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
