import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaHeart, FaChartLine, FaShieldAlt, FaHandHoldingHeart } from 'react-icons/fa';
import './HomePage.css'; // Import the dedicated CSS file

const HomePage = () => {
  const features = [
    {
      icon: <FaBook />,
      title: "Educational Resources",
      description: "Comprehensive learning materials about addiction, recovery, and mental health."
    },
    {
      icon: <FaUsers />,
      title: "Professional Counseling",
      description: "Connect with certified counselors and therapists specialized in addiction recovery."
    },
    {
      icon: <FaHeart />,
      title: "Support Programs",
      description: "Join support groups and recovery programs tailored to your needs."
    },
    {
      icon: <FaChartLine />,
      title: "Progress Tracking",
      description: "Monitor your recovery journey with personalized assessments and milestones."
    },
    {
      icon: <FaShieldAlt />,      title: "Safe Environment",
      description: "A secure and confidential platform for your recovery journey."
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "24/7 Support",
      description: "Round-the-clock assistance and crisis intervention when you need it most."
    }
  ];
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>Your Journey to Recovery Starts Here</h1>
          <p>Empowering individuals with the tools, support, and resources needed for a drug-free life.</p>
          <div className="home-hero-actions">
            <Link to="/education" className="home-hero-btn primary">
              Start Learning
            </Link>
            <Link to="/counseling" className="home-hero-btn secondary">
              Get Support
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="container">
          <div className="home-features-header">
            <h2>Comprehensive Recovery Solutions</h2>
            <p>Our platform provides everything you need to support your recovery journey</p>
          </div>
            <div className="home-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="home-feature-card">
                <div className="home-feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="home-stats">
        <div className="container">
          <div className="home-stats-grid">
            <div className="home-stat-item">
              <span className="home-stat-number">10,000+</span>
              <span className="home-stat-label">Lives Changed</span>
            </div>
            <div className="home-stat-item">
              <span className="home-stat-number">500+</span>
              <span className="home-stat-label">Certified Counselors</span>
            </div>
            <div className="home-stat-item">
              <span className="home-stat-number">95%</span>
              <span className="home-stat-label">Success Rate</span>
            </div>
            <div className="home-stat-item">
              <span className="home-stat-number">24/7</span>
              <span className="home-stat-label">Support Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="home-cta-content">
          <h2>Ready to Start Your Recovery Journey?</h2>
          <p>Join thousands of others who have found hope, healing, and a new beginning through our comprehensive recovery platform.</p>
          <div className="home-cta-actions">            <Link to="/login" className="home-hero-btn primary">
              Get Started Today
            </Link>
            <Link to="/programs" className="home-hero-btn secondary">
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
