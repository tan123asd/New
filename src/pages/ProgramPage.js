import React, { useState } from 'react';
import { 
  FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUsers, 
  FaBook, FaChartLine, FaFilter, FaRegClock, FaRegCalendarCheck,
  FaSchool, FaUniversity, FaUserFriends, FaChalkboardTeacher
} from 'react-icons/fa';
import './ProgramPage.css';

const ProgramPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeAudience, setActiveAudience] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'Tất cả', icon: <FaFilter /> },
    { id: 'upcoming', label: 'Sắp diễn ra', icon: <FaRegCalendarCheck /> },
    { id: 'ongoing', label: 'Đang diễn ra', icon: <FaRegClock /> },
    { id: 'completed', label: 'Đã kết thúc', icon: <FaChartLine /> }
  ];

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
    const matchesFilter = activeFilter === 'all' || program.status === activeFilter;
    const matchesAudience = activeAudience === 'all' || program.audience === activeAudience;
    return matchesSearch && matchesFilter && matchesAudience;
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
          {filterOptions.map(option => (
            <button
              key={option.id}
              className={`filter-button ${activeFilter === option.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(option.id)}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
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
          {filteredPrograms.map(program => (
            <div key={program.id} className="program-card">
              <div 
                className="program-image"
                style={{ background: program.image }}
              />
              <div className="program-content">
                <h3 className="program-title">{program.title}</h3>
                <div className="program-info">
                  <FaCalendarAlt />
                  {program.date}
                </div>
                <div className="program-info">
                  <FaMapMarkerAlt />
                  {program.location}
                </div>
                <div className="program-info">
                  <FaUsers />
                  {program.participants} người tham gia
                </div>
                <p className="program-description">{program.description}</p>
              </div>
              <div className="program-footer">
                <span className={`program-status ${program.status}`}>
                  {program.status === 'upcoming' && 'Sắp diễn ra'}
                  {program.status === 'ongoing' && 'Đang diễn ra'}
                  {program.status === 'completed' && 'Đã kết thúc'}
                </span>
                <button 
                  className="register-button"
                  disabled={program.status === 'completed'}
                >
                  {program.status === 'completed' ? 'Đã kết thúc' : 'Đăng ký tham gia'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramPage; 