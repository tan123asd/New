import React, { useState } from 'react';
import { 
  FaSearch, FaUsers, 
  FaSchool, FaUniversity, FaUserFriends, FaChalkboardTeacher
} from 'react-icons/fa';
import './ProgramPage.css';
import ProgramCard from '../components/ProgramCard/ProgramCard';
// Import the FeedbackModal component
import FeedbackModal from '../components/FeedbackModal/FeedbackModal';

// Placeholder User Data
const currentUser = {
  userId: 'user-abc',
  role: 'user', // or 'counselor', 'admin'
  // other user properties as needed
};

const ProgramPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAudience, setActiveAudience] = useState('all');
  // State to track registered programs for the current user (using program IDs)
  const [registeredPrograms, setRegisteredPrograms] = useState([]); // e.g., [1, 3]

  // State for managing feedback modal
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [programForFeedback, setProgramForFeedback] = useState(null); // Store the program object for feedback

  // Placeholder handler for registration button click
  const handleRegisterClick = (programId) => {
    console.log('Register button clicked for program ID:', programId, 'by user:', currentUser.userId);
    // Simulate successful registration by adding the programId to the state
    // In a real app, you would make an API call here
    if (!registeredPrograms.includes(programId)) {
      setRegisteredPrograms([...registeredPrograms, programId]);
      console.log(`User ${currentUser.userId} successfully registered for program ${programId}`);
      // TODO: Handle potential UI feedback (e.g., show a success message)
    } else {
       console.log(`User ${currentUser.userId} is already registered for program ${programId}`);
    }
  };

  // Handler for view/send feedback button click
  const handleViewFeedbackClick = (programId) => {
      console.log('Feedback button clicked for program ID:', programId, 'by user:', currentUser.userId);
      // Find the program object
      const program = programs.find(p => p.id === programId);
      if (program) {
          setProgramForFeedback(program); // Set the program for the modal
          setIsFeedbackModalOpen(true); // Open the modal
      }
      // TODO: Implement logic to fetch existing feedback if needed
  };

   // Handler to close the feedback modal
   const handleCloseFeedbackModal = () => {
      setIsFeedbackModalOpen(false);
      setProgramForFeedback(null); // Clear the program data when closing
   };

   // Handler to submit feedback (called from FeedbackModal)
   const handleSubmitFeedback = (programId, userId, rating, comment) => {
      console.log('Feedback received in ProgramPage:');
      console.log('Program ID:', programId);
      console.log('User ID:', userId);
      console.log('Rating:', rating);
      console.log('Comment:', comment);

      // TODO: Implement actual API call to save feedback to UserEventFeedbacks table

      // After processing (or sending to API), close the modal
      handleCloseFeedbackModal();
      // TODO: Provide user feedback (e.g., success message)
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

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAudience = activeAudience === 'all' || program.audience === activeAudience;
    return matchesSearch && matchesAudience;
  });

  return (
    <div className="program-page">
      <div className="program-header">
        <div className="program-header-content">
          <h1>Chương trình truyền thông & giáo dục</h1>
          <p>Khám phá và đăng ký tham gia các chương trình phòng chống ma túy phù hợp với bạn</p>
        </div>
      </div>

      <div className="program-container">
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Tìm kiếm chương trình..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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

        <div className="program-grid">
          {/* Use the ProgramCard component for each program */}
          {filteredPrograms.map(program => (
            <ProgramCard 
              key={program.id} 
              program={program} 
              onRegisterClick={handleRegisterClick}
              onViewFeedbackClick={handleViewFeedbackClick}
              // Determine if the current user is registered for this program
              isRegistered={registeredPrograms.includes(program.id)}
            />
          ))}
        </div>
      </div>

      {/* Render the FeedbackModal if isFeedbackModalOpen is true and programForFeedback is available */}
      {isFeedbackModalOpen && programForFeedback && (
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={handleCloseFeedbackModal}
          program={programForFeedback}
          currentUser={currentUser}
          onSubmitFeedback={handleSubmitFeedback} // Pass the submit handler
        />
      )}

    </div>
  );
};

export default ProgramPage; 