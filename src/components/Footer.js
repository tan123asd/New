import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css'; // Import the dedicated CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-company">
            <div className="footer-logo">
              <img src="/Dlogo.jpg" alt="Drug Free" className="footer-logo-img" />
              <span className="footer-logo-text">Drug Free</span>
            </div>
            <p className="footer-description">
              Empowering individuals on their journey to recovery through education, support, and comprehensive resources.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Follow us on Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Follow us on Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Follow us on Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Follow us on LinkedIn">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <Link to="/education" className="footer-nav-link">
                  Education Hub
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/courses" className="footer-nav-link">
                  Courses
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/programs" className="footer-nav-link">
                  Recovery Programs
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/counseling" className="footer-nav-link">
                  Counseling Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="footer-section-title">Support</h3>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <Link to="/help" className="footer-nav-link">
                  Help Center
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/crisis" className="footer-nav-link">
                  Crisis Support
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/community" className="footer-nav-link">
                  Community Forum
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/resources" className="footer-nav-link">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="footer-section-title">Contact Us</h3>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <FaPhone className="footer-contact-icon" />
                <span className="footer-contact-text">+1 (555) 123-4567</span>
              </div>
              <div className="footer-contact-item">
                <FaEnvelope className="footer-contact-icon" />
                <span className="footer-contact-text">support@drugfree.com</span>
              </div>
              <div className="footer-contact-item">
                <FaMapMarkerAlt className="footer-contact-icon" />
                <span className="footer-contact-text">
                  123 Recovery Street<br />
                  Hope City, HC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2025 Drug Free. All rights reserved.
            </p>
            <div className="footer-legal-links">
              <Link to="/privacy" className="footer-legal-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="footer-legal-link">
                Terms of Service
              </Link>
              <Link to="/cookies" className="footer-legal-link">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
