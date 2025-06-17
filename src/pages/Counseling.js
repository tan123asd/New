import React, { useState, useEffect } from 'react';
import { 
  FaCalendar, 
  FaUser, 
  FaStar, 
  FaGraduationCap,
  FaHeart,
  FaShieldAlt,
  FaSearch,
  FaComments,
  FaTimes
} from 'react-icons/fa';
import ApiService from '../services/api';
import { useApi } from '../hooks/useApi';
import { NotificationService } from '../services/errorHandler';
import './Counseling.css'; // Import the dedicated CSS file

const Counseling = () => {
  const { loading: slotsLoading, error: slotsError, callApi } = useApi();
  const [counselors, setCounselors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    type: 'video',
    notes: ''
  });

  const filterOptions = [
    { id: 'all', label: 'All Specialists', icon: FaUser },
    { id: 'addiction', label: 'Addiction Recovery', icon: FaHeart },
    { id: 'depression', label: 'Depression & Anxiety', icon: FaShieldAlt },
    { id: 'trauma', label: 'Trauma & PTSD', icon: FaGraduationCap },
    { id: 'family', label: 'Family Therapy', icon: FaComments }
  ];

  useEffect(() => {
    fetchData();
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await callApi(() => ApiService.getAvailableSlots());
      if (response.success && response.data) {
        setAvailableSlots(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
    }
  };

  const handleBookSlot = async (slotData) => {
    try {
      setBookingLoading(true);
      const response = await ApiService.bookCounselingSlot(slotData);
      if (response.success) {
        NotificationService.success('Đặt lịch tư vấn thành công!');
        fetchAvailableSlots(); // Refresh available slots
        setShowBookingModal(false);
      }
    } catch (error) {
      console.error('Failed to book slot:', error);
      NotificationService.error('Có lỗi xảy ra khi đặt lịch.');
    } finally {
      setBookingLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const counselorsData = await ApiService.getCounselors();
      setCounselors(counselorsData);    } catch (error) {
      console.error('Failed to fetch counseling data:', error);
      
      // No fallback mock data - show empty state or error message
      setCounselors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (counselor) => {
    setSelectedCounselor(counselor);
    setShowBookingModal(true);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    try {
      await ApiService.bookAppointment(selectedCounselor.id, bookingData);
      setShowBookingModal(false);
      setBookingData({ date: '', time: '', type: 'video', notes: '' });
      fetchData(); // Refresh appointments
    } catch (error) {
      console.error('Failed to book appointment:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading counseling services...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="counseling-page">
      <div className="container">
        {/* Hero Section */}
        <div className="counseling-hero">
          <div className="hero-content">
            <h1>Professional Counseling Services</h1>
            <p>Connect with licensed therapists and counselors specializing in addiction recovery and mental health support</p>
            
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">500+</span>
                <span className="hero-stat-label">Clients Helped</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">98%</span>
                <span className="hero-stat-label">Success Rate</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">24/7</span>
                <span className="hero-stat-label">Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="counseling-search-section">
          <div className="search-header">
            <h2>Find Your Perfect Counselor</h2>
            <p>Filter by specialty, availability, and approach to find the right fit for you</p>
          </div>

          <div className="search-form">
            <div className="search-input-group">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, specialty, or approach..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <button className="search-btn">
              <FaSearch />
              Search
            </button>
          </div>

          <div className="filter-tabs">            {filterOptions.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`filter-tab ${selectedFilter === category.id ? 'active' : ''}`}
              >
                <category.icon />
                {category.label}
              </button>
            ))}
          </div>

          <div className="specialty-filters">
            {['CBT', 'EMDR', 'Group Therapy', 'Family Therapy', 'Mindfulness', 'Trauma-Informed'].map(specialty => (
              <button key={specialty} className="specialty-filter">
                {specialty}
              </button>
            ))}
          </div>
        </div>

        {/* Counselors Grid */}
        <div className="counselor-grid">
          {counselors.map((counselor) => (
            <div key={counselor.id} className="counselor-card">
              <div className="counselor-header">
                <div className="counselor-avatar">
                  {counselor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="counselor-info">
                  <h3>{counselor.name}</h3>
                  <div className="counselor-title">{counselor.title}</div>
                  <div className="counselor-rating">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`star ${i < Math.floor(counselor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="rating-text">
                      {counselor.rating} ({counselor.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="counselor-specialties">
                <div className="specialties-label">Specialties</div>
                <div className="specialties-list">
                  {counselor.specialty.map((spec, index) => (
                    <span key={index} className="specialty-tag">{spec}</span>
                  ))}
                </div>
              </div>

              <div className="counselor-details">
                <div className="detail-row">
                  <span className="detail-label">Experience</span>
                  <span className="detail-value">{counselor.experience}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Education</span>
                  <span className="detail-value">{counselor.education}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Languages</span>
                  <span className="detail-value">{counselor.languages.join(', ')}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Price</span>
                  <span className="detail-value">{counselor.price}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Next Available</span>
                  <span className="detail-value">
                    <div className="availability-indicator available">
                      <div className="availability-dot"></div>
                      {counselor.nextAvailable}
                    </div>
                  </span>
                </div>
              </div>

              <div className="counselor-actions">
                <button
                  onClick={() => handleBookAppointment(counselor)}
                  className="btn-primary"
                >
                  <FaCalendar />
                  Book Session
                </button>
                <button className="btn-secondary">
                  <FaUser />
                  View Profile
                </button>
              </div>
            </div>          ))}
        </div>

        {/* Booking Modal */}
        {showBookingModal && selectedCounselor && (
          <div className="modal-overlay">
            <div className="booking-modal">
              <div className="modal-header">
                <h3>Book Appointment with {selectedCounselor.name}</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="modal-close"
                >
                  <FaTimes />
                </button>
              </div>
              
              <form onSubmit={handleSubmitBooking} className="booking-form">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="time"
                    required
                    className="form-input"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Session Type</label>
                  <select
                    className="form-input"
                    value={bookingData.type}
                    onChange={(e) => setBookingData({...bookingData, type: e.target.value})}
                  >
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Additional Notes</label>
                  <textarea
                    rows="3"
                    className="form-input"
                    placeholder="Any specific topics or concerns you'd like to discuss..."
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                  />
                </div>
                
                <div className="modal-actions">
                  <button type="submit" className="btn-primary">
                    Book Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Counseling;
