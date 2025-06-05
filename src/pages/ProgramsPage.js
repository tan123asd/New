import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faCalendarAlt,
  faMapMarkerAlt,
  faUsers,
  faClock,
  faHeart,
  faArrowRight,
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import './ProgramsPage.css';

const ProgramsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả chương trình' },
    { id: 'education', name: 'Giáo dục' },
    { id: 'community', name: 'Cộng đồng' },
    { id: 'counseling', name: 'Tư vấn' },
    { id: 'volunteer', name: 'Tình nguyện' },
  ];

  const statuses = [
    { id: 'all', name: 'Tất cả trạng thái' },
    { id: 'upcoming', name: 'Sắp diễn ra' },
    { id: 'ongoing', name: 'Đang diễn ra' },
    { id: 'completed', name: 'Đã kết thúc' },
  ];

  const programs = [
    {
      id: 1,
      Title: 'Hội thảo Phòng Chống Ma Túy Cho Học Sinh',
      Description: 'Chương trình giáo dục và nâng cao nhận thức về tác hại của ma túy cho học sinh THPT.',
      category: 'education',
      status: 'upcoming',
      StartTime: '2024-04-15T08:00:00',
      EndTime: '2024-04-15T11:30:00',
      Location: 'Trường THPT Nguyễn Huệ, Quận 1, TP.HCM',
      participants: 150,
      maxParticipants: 200,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isRegistered: false,
    },
    {
      id: 2,
      Title: 'Tư Vấn Miễn Phí Cho Gia Đình',
      Description: 'Chương trình tư vấn và hỗ trợ tâm lý cho gia đình có người thân nghiện ma túy.',
      category: 'counseling',
      status: 'ongoing',
      StartTime: '2024-03-20T13:30:00',
      EndTime: '2024-03-20T16:30:00',
      Location: 'Trung tâm Tư vấn BrightChoice, Quận 3, TP.HCM',
      participants: 45,
      maxParticipants: 50,
      image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isRegistered: true,
    },
    {
      id: 3,
      Title: 'Ngày Hội Cộng Đồng Phòng Chống Ma Túy',
      Description: 'Sự kiện cộng đồng với các hoạt động tuyên truyền, tư vấn và giải trí.',
      category: 'community',
      status: 'upcoming',
      StartTime: '2024-05-01T07:00:00',
      EndTime: '2024-05-01T17:00:00',
      Location: 'Công viên Tao Đàn, Quận 1, TP.HCM',
      participants: 280,
      maxParticipants: 500,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isRegistered: false,
    },
    {
      id: 4,
      Title: 'Khóa Tập Huấn Tình Nguyện Viên',
      Description: 'Đào tạo kỹ năng và kiến thức cho tình nguyện viên tham gia công tác phòng chống ma túy.',
      category: 'volunteer',
      status: 'ongoing',
      StartTime: '2024-03-25T08:30:00',
      EndTime: '2024-03-25T16:30:00',
      Location: 'Trung tâm Đào tạo BrightChoice, Quận 7, TP.HCM',
      participants: 35,
      maxParticipants: 40,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isRegistered: false,
    },
    {
      id: 5,
      Title: 'Hội Thảo Chia Sẻ Kinh Nghiệm Cai Nghiện',
      Description: 'Chia sẻ kinh nghiệm và phương pháp hỗ trợ người nghiện trên con đường cai nghiện.',
      category: 'counseling',
      status: 'completed',
      StartTime: '2024-02-15T09:00:00',
      EndTime: '2024-02-15T12:00:00',
      Location: 'Hội trường BrightChoice, Quận 5, TP.HCM',
      participants: 120,
      maxParticipants: 150,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isRegistered: false,
    },
    {
      id: 6,
      Title: 'Chương Trình Tuyên Truyền Tại Trường Đại Học',
      Description: 'Tuyên truyền và nâng cao nhận thức về ma túy cho sinh viên đại học.',
      category: 'education',
      status: 'upcoming',
      StartTime: '2024-04-20T13:00:00',
      EndTime: '2024-04-20T16:00:00',
      Location: 'Trường Đại học Khoa học Xã hội và Nhân văn, TP.HCM',
      participants: 180,
      maxParticipants: 300,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isRegistered: false,
    },
  ];

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.Description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || program.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
  };

  const formatTime = (startTimeString, endTimeString) => {
    const startTime = new Date(startTimeString);
    const endTime = new Date(endTimeString);
    const startHours = startTime.getHours().toString().padStart(2, '0');
    const startMinutes = startTime.getMinutes().toString().padStart(2, '0');
    const endHours = endTime.getHours().toString().padStart(2, '0');
    const endMinutes = endTime.getMinutes().toString().padStart(2, '0');
    return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return '#2196f3';
      case 'ongoing':
        return '#4caf50';
      case 'completed':
        return '#9e9e9e';
      default:
        return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming':
        return 'Sắp diễn ra';
      case 'ongoing':
        return 'Đang diễn ra';
      case 'completed':
        return 'Đã kết thúc';
      default:
        return status;
    }
  };

  return (
    <div className="programs-page">
      <div className="programs-header">
        <div className="programs-header-content">
          <h1>Chương Trình Phòng Chống Ma Túy</h1>
          <p>Tham gia các chương trình và hoạt động ý nghĩa để góp phần xây dựng cộng đồng lành mạnh, không ma túy</p>
        </div>
      </div>

      <div className="programs-container">
        <div className="programs-sidebar">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm chương trình..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-section">
            <h3><FontAwesomeIcon icon={faFilter} /> Lọc chương trình</h3>
            
            <div className="filter-group">
              <h4>Danh mục</h4>
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="filter-group">
              <h4>Trạng thái</h4>
              {statuses.map(status => (
                <button
                  key={status.id}
                  className={`filter-btn ${selectedStatus === status.id ? 'active' : ''}`}
                  onClick={() => setSelectedStatus(status.id)}
                >
                  {status.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="programs-grid">
          {filteredPrograms.map(program => (
            <div key={program.id} className="program-card">
              <div className="program-image">
                <img src={program.image} alt={program.Title} />
                <div 
                  className="program-status"
                  style={{ backgroundColor: getStatusColor(program.status) }}
                >
                  {getStatusText(program.status)}
                </div>
              </div>
              
              <div className="program-content">
                <div className="program-category">
                  {categories.find(c => c.id === program.category)?.name}
                </div>
                <h3>{program.Title}</h3>
                <p>{program.Description}</p>
                
                <div className="program-details">
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>{formatDate(program.StartTime)}</span>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{formatTime(program.StartTime, program.EndTime)}</span>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{program.Location}</span>
                  </div>
                  <div className="detail-item">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>{program.participants}/{program.maxParticipants} người tham gia</span>
                  </div>
                </div>

                <div className="program-footer">
                  <div className="program-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${(program.participants / program.maxParticipants) * 100}%`,
                          backgroundColor: program.participants >= program.maxParticipants ? '#f44336' : '#4caf50'
                        }}
                      />
                    </div>
                    <span className="progress-text">
                      {program.participants >= program.maxParticipants ? (
                        <FontAwesomeIcon icon={faExclamationCircle} /> 
                      ) : (
                        <FontAwesomeIcon icon={faCheckCircle} />
                      )}
                      {program.participants >= program.maxParticipants ? 'Đã đủ người' : 'Còn chỗ'}
                    </span>
                  </div>
                  
                  {program.isRegistered ? (
                    <button className="btn-registered">
                      <FontAwesomeIcon icon={faCheckCircle} /> Đã đăng ký
                    </button>
                  ) : program.participants >= program.maxParticipants ? (
                    <button className="btn-full" disabled>
                      <FontAwesomeIcon icon={faExclamationCircle} /> Đã đủ người
                    </button>
                  ) : (
                    <button className="btn-register">
                      Đăng ký tham gia
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage; 