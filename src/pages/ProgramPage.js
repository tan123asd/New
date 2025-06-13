import React, { useState } from 'react';
import { 
  FaSearch, FaUsers, FaSchool, FaUniversity, FaUserFriends, 
  FaChalkboardTeacher, FaCalendarAlt, FaMapMarkerAlt, FaUsers as FaParticipants,
  FaStar, FaRegStar, FaStarHalfAlt, FaTimes
} from 'react-icons/fa';
import './ProgramPage.css';

// ============= PROGRAM CARD COMPONENT =============
const ProgramCard = ({ program, onRegisterClick, onViewFeedbackClick, isRegistered }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'upcoming': return 'upcoming';
      case 'ongoing': return 'ongoing';
      case 'completed': return 'completed';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return 'Sắp diễn ra';
      case 'ongoing': return 'Đang diễn ra';
      case 'completed': return 'Đã kết thúc';
      default: return status;
    }
  };

  return (
    <div className="program-card">
      <div className="program-image" style={{ background: program.image }}>
        <div className="program-status-badge">
          <span className={`status ${getStatusClass(program.status)}`}>
            {getStatusText(program.status)}
          </span>
        </div>
      </div>
      <div className="program-content">
        <h3 className="program-title">{program.title}</h3>
        <div className="program-info">
          <FaCalendarAlt />
          <span>{program.date}</span>
        </div>
        <div className="program-info">
          <FaMapMarkerAlt />
          <span>{program.location}</span>
        </div>
        <div className="program-info">
          <FaParticipants />
          <span>{program.participants} người tham gia</span>
        </div>
        <p className="program-description">{program.description}</p>
      </div>
      <div className="program-footer">
        <button
          className={`register-button ${isRegistered ? 'registered' : ''}`}
          onClick={() => onRegisterClick(program.id)}
          disabled={program.status === 'completed' || isRegistered}
        >
          {isRegistered ? 'Đã đăng ký' : 'Đăng ký tham gia'}
        </button>
        <button
          className="feedback-button"
          onClick={() => onViewFeedbackClick(program.id)}
        >
          Đánh giá
        </button>
      </div>
    </div>
  );
};

// ============= FEEDBACK MODAL COMPONENT =============
const FeedbackModal = ({ isOpen, onClose, program, currentUser, onSubmitFeedback }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitFeedback(program.id, currentUser.userId, rating, comment);
    setRating(0);
    setComment('');
  };

  if (!isOpen) return null;

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => {
      const ratingValue = hoverRating || rating;
      return (
        <label key={star}>
          <input
            type="radio"
            name="rating"
            value={star}
            onClick={() => setRating(star)}
          />
          <FaStar
            className="star"
            color={star <= ratingValue ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          />
        </label>
      );
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Đánh giá chương trình</h2>
        <h3>{program.title}</h3>
        <form onSubmit={handleSubmit}>
          <div className="rating-container">
            {renderStars()}
          </div>
          <textarea
            placeholder="Nhập nhận xét của bạn..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              Hủy
            </button>
            <button type="submit" className="submit-button">
              Gửi đánh giá
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============= CONSTANTS & MOCK DATA =============
const currentUser = {
  userId: 'user-abc',
  role: 'user',
};

const audienceOptions = [
  { id: 'all', label: 'Tất cả đối tượng', icon: <FaUsers /> },
  { id: 'students', label: 'Học sinh', icon: <FaSchool /> },
  { id: 'university', label: 'Sinh viên', icon: <FaUniversity /> },
  { id: 'parents', label: 'Phụ huynh', icon: <FaUserFriends /> },
  { id: 'teachers', label: 'Giáo viên', icon: <FaChalkboardTeacher /> }
];

const programs = [
  {
    id: 1,
    title: 'Chương trình "Phòng chống ma túy học đường"',
    description: 'Chương trình giáo dục và nâng cao nhận thức về ma túy cho học sinh THPT, bao gồm các hoạt động tương tác và thảo luận nhóm.',
    date: '15/04/2024',
    location: 'Trường THPT ABC, Quận 1, TP.HCM',
    audience: 'students', 
    status: 'upcoming',
    participants: 120,
    image: 'linear-gradient(45deg, #3f51b5, #7986cb)'
  },
  {
    id: 2,
    title: 'Hội thảo "Phòng chống ma túy trong giới trẻ"',
    description: 'Hội thảo chia sẻ kinh nghiệm và kỹ năng phòng tránh ma túy cho sinh viên các trường đại học.',
    date: '20/04/2024',
    location: 'Hội trường Đại học XYZ',
    audience: 'university',
    status: 'upcoming',
    participants: 200,
    image: 'linear-gradient(45deg, #1976d2, #64b5f6)'
  },
  {
    id: 3,
    title: 'Khóa tập huấn "Kỹ năng phòng chống ma túy cho giáo viên"',
    description: 'Khóa tập huấn trang bị kiến thức và kỹ năng cho giáo viên trong việc phát hiện và hỗ trợ học sinh có nguy cơ.',
    date: '10/04/2024',
    location: 'Trung tâm Đào tạo ABC',
    audience: 'teachers',
    status: 'ongoing',
    participants: 50,
    image: 'linear-gradient(45deg, #2e7d32, #81c784)'
  },
  {
    id: 4,
    title: 'Hội thảo "Phòng chống ma túy trong gia đình"',
    description: 'Chia sẻ kinh nghiệm và kỹ năng cho phụ huynh trong việc phòng chống ma túy và bảo vệ con em.',
    date: '05/04/2024',
    location: 'Trung tâm Văn hóa Quận 3',
    audience: 'parents',
    status: 'completed',
    participants: 150,
    image: 'linear-gradient(45deg, #7b1fa2, #b39ddb)'
  }
];

// ============= MAIN COMPONENT =============
const ProgramPage = () => {
  // ============= STATE MANAGEMENT =============
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAudience, setActiveAudience] = useState('all');
  const [registeredPrograms, setRegisteredPrograms] = useState([]);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [programForFeedback, setProgramForFeedback] = useState(null);

  // ============= EVENT HANDLERS =============
  const handleRegisterClick = (programId) => {
    console.log('Register button clicked for program ID:', programId, 'by user:', currentUser.userId);
    if (!registeredPrograms.includes(programId)) {
      setRegisteredPrograms([...registeredPrograms, programId]);
      console.log(`User ${currentUser.userId} successfully registered for program ${programId}`);
    } else {
      console.log(`User ${currentUser.userId} is already registered for program ${programId}`);
    }
  };

  const handleViewFeedbackClick = (programId) => {
    console.log('Feedback button clicked for program ID:', programId, 'by user:', currentUser.userId);
    const program = programs.find(p => p.id === programId);
    if (program) {
      setProgramForFeedback(program);
      setIsFeedbackModalOpen(true);
    }
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    setProgramForFeedback(null);
  };

  const handleSubmitFeedback = (programId, userId, rating, comment) => {
    console.log('Feedback received:', { programId, userId, rating, comment });
    // TODO: Implement API call to save feedback
    handleCloseFeedbackModal();
  };

  // ============= DATA FILTERING =============
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAudience = activeAudience === 'all' || program.audience === activeAudience;
    return matchesSearch && matchesAudience;
  });

  // ============= RENDER FUNCTIONS =============
  const renderHeader = () => (
    <div className="program-header">
      <div className="program-header-content">
        <h1>Chương trình truyền thông & giáo dục</h1>
        <p>Khám phá và đăng ký tham gia các chương trình phòng chống ma túy phù hợp với bạn</p>
      </div>
    </div>
  );

  const renderSearchBar = () => (
    <div className="search-bar">
      <FaSearch />
      <input
        type="text"
        placeholder="Tìm kiếm chương trình..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );

  const renderFilters = () => (
    <div className="filter-section">
      {audienceOptions.map(option => (
        <button
          key={option.id}
          className={`filter-button ${activeAudience === option.id ? 'active' : ''}`}
          onClick={() => setActiveAudience(option.id)}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );

  const renderProgramGrid = () => (
    <div className="program-grid">
      {filteredPrograms.map(program => (
        <ProgramCard 
          key={program.id} 
          program={program} 
          onRegisterClick={handleRegisterClick}
          onViewFeedbackClick={handleViewFeedbackClick}
          isRegistered={registeredPrograms.includes(program.id)}
        />
      ))}
    </div>
  );

  const renderFeedbackModal = () => (
    isFeedbackModalOpen && programForFeedback && (
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={handleCloseFeedbackModal}
        program={programForFeedback}
        currentUser={currentUser}
        onSubmitFeedback={handleSubmitFeedback}
      />
    )
  );

  // ============= MAIN RENDER =============
  return (
    <div className="program-page">
      {renderHeader()}
      <div className="program-container">
        {renderSearchBar()}
        {renderFilters()}
        {renderProgramGrid()}
      </div>
      {renderFeedbackModal()}
    </div>
  );
};

export default ProgramPage; 