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
import './Counseling.css'; // Import the dedicated CSS file

const Counseling = () => {
  const [counselors, setCounselors] = useState([]);
  // const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, []);  const fetchData = async () => {
    try {
      const counselorsData = await ApiService.getCounselors();
      // const appointmentsData = await ApiService.getAppointments();
      setCounselors(counselorsData);
      // setAppointments(appointmentsData);
    } catch (error) {
      console.error('Failed to fetch counseling data:', error);
      
      // Enhanced mock data with more details
      setCounselors([
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          title: 'Licensed Clinical Psychologist',
          specialty: ['Addiction Recovery', 'CBT', 'Trauma Therapy'],
          category: 'addiction',
          rating: 4.9,
          reviewCount: 127,
          experience: '12 years',
          education: 'PhD in Clinical Psychology, Harvard',
          languages: ['English', 'Spanish'],
          availability: 'Mon-Fri 9AM-5PM',
          nextAvailable: 'Today at 2:00 PM',
          sessionTypes: ['Video', 'Phone', 'In-person'],
          bio: 'Dr. Johnson specializes in evidence-based treatments for addiction and co-occurring mental health disorders. She has helped over 500 clients achieve lasting recovery.',
          price: '$150/session',
          verified: true,
          image: '/api/placeholder/150/150'
        },
        {
          id: 2,
          name: 'Dr. Michael Chen',
          title: 'Addiction Counselor & Therapist',
          specialty: ['Substance Abuse', 'Group Therapy', 'Mindfulness'],
          category: 'addiction',
          rating: 4.8,
          reviewCount: 89,
          experience: '8 years',
          education: 'MA in Addiction Counseling, UCLA',
          languages: ['English', 'Mandarin'],
          availability: 'Tue-Sat 10AM-6PM',
          nextAvailable: 'Tomorrow at 10:00 AM',
          sessionTypes: ['Video', 'Phone'],
          bio: 'Specializing in holistic approaches to addiction recovery, Dr. Chen combines traditional therapy with mindfulness practices.',
          price: '$120/session',
          verified: true,
          image: '/api/placeholder/150/150'
        },
        {
          id: 3,
          name: 'Dr. Emily Rodriguez',
          title: 'Licensed Social Worker',
          specialty: ['Depression', 'Anxiety', 'Life Transitions'],
          category: 'depression',
          rating: 4.9,
          reviewCount: 156,
          experience: '10 years',
          education: 'MSW in Clinical Social Work, NYU',
          languages: ['English', 'Spanish', 'Portuguese'],
          availability: 'Mon-Thu 8AM-4PM',
          nextAvailable: 'Friday at 11:00 AM',
          sessionTypes: ['Video', 'Phone', 'In-person'],
          bio: 'Dr. Rodriguez provides compassionate care for individuals struggling with depression, anxiety, and major life changes.',
          price: '$130/session',
          verified: true,
          image: '/api/placeholder/150/150'
        },
        {
          id: 4,
          name: 'Dr. James Wilson',
          title: 'Trauma Specialist',
          specialty: ['PTSD', 'Trauma Recovery', 'EMDR'],
          category: 'trauma',
          rating: 4.7,
          reviewCount: 94,
          experience: '15 years',
          education: 'PhD in Trauma Psychology, Stanford',
          languages: ['English'],
          availability: 'Wed-Sun 12PM-8PM',
          nextAvailable: 'Monday at 3:00 PM',
          sessionTypes: ['Video', 'In-person'],
          bio: 'Dr. Wilson is a leading expert in trauma recovery, specializing in EMDR and other evidence-based trauma treatments.',
          price: '$180/session',          verified: true,
          image: '/api/placeholder/150/150'
        }
      ]);

      // Mock appointments data commented out for now
      // setAppointments([
      //   {
      //     id: 1,
      //     counselor: 'Dr. Sarah Johnson',
      //     date: '2025-06-18',      //     time: '10:00 AM',
      //     type: 'video',
      //     status: 'confirmed'
      //   },
      //   {
      //     id: 2,
      //     counselor: 'Dr. Michael Chen',
      //     date: '2025-06-20',
      //     time: '2:00 PM',
      //     type: 'phone',
      //     status: 'pending'
      //   }
      // ]);
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
