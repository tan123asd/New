import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faBook,
  faGraduationCap,
  faUsers,
  faClock,
  faStar,
  faPlayCircle,
  faLock,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import './CoursesPage.css';

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả khóa học' },
    { id: 'basic', name: 'Kiến thức cơ bản' },
    { id: 'prevention', name: 'Phòng chống ma túy' },
    { id: 'counseling', name: 'Tư vấn và hỗ trợ' },
    { id: 'community', name: 'Hoạt động cộng đồng' },
  ];

  const levels = [
    { id: 'all', name: 'Tất cả cấp độ' },
    { id: 'beginner', name: 'Cơ bản' },
    { id: 'intermediate', name: 'Trung cấp' },
    { id: 'advanced', name: 'Nâng cao' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Hiểu biết cơ bản về ma túy và chất gây nghiện',
      description: 'Khóa học cung cấp kiến thức nền tảng về các loại ma túy, tác hại và cách nhận biết.',
      category: 'basic',
      level: 'beginner',
      duration: '4 tuần',
      students: 1250,
      rating: 4.8,
      lessons: 12,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isLocked: false,
      progress: 100,
    },
    {
      id: 2,
      title: 'Kỹ năng phòng chống ma túy cho học sinh',
      description: 'Học cách nhận biết và phòng tránh các tình huống nguy hiểm liên quan đến ma túy.',
      category: 'prevention',
      level: 'beginner',
      duration: '6 tuần',
      students: 980,
      rating: 4.9,
      lessons: 15,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isLocked: false,
      progress: 60,
    },
    {
      id: 3,
      title: 'Tư vấn và hỗ trợ người nghiện',
      description: 'Phương pháp tư vấn và hỗ trợ người nghiện ma túy trên con đường cai nghiện.',
      category: 'counseling',
      level: 'advanced',
      duration: '8 tuần',
      students: 450,
      rating: 4.7,
      lessons: 20,
      image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isLocked: true,
      progress: 0,
    },
    {
      id: 4,
      title: 'Xây dựng cộng đồng phòng chống ma túy',
      description: 'Học cách tổ chức và tham gia các hoạt động cộng đồng phòng chống ma túy.',
      category: 'community',
      level: 'intermediate',
      duration: '5 tuần',
      students: 680,
      rating: 4.6,
      lessons: 14,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isLocked: false,
      progress: 30,
    },
    {
      id: 5,
      title: 'Phương pháp giáo dục phòng chống ma túy',
      description: 'Kỹ năng và phương pháp giảng dạy về phòng chống ma túy cho giáo viên.',
      category: 'prevention',
      level: 'intermediate',
      duration: '7 tuần',
      students: 320,
      rating: 4.9,
      lessons: 18,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isLocked: true,
      progress: 0,
    },
    {
      id: 6,
      title: 'Hỗ trợ tâm lý cho gia đình người nghiện',
      description: 'Cách thức hỗ trợ tâm lý cho gia đình có người thân nghiện ma túy.',
      category: 'counseling',
      level: 'intermediate',
      duration: '6 tuần',
      students: 540,
      rating: 4.8,
      lessons: 16,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      isLocked: false,
      progress: 0,
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="courses-page">
      <div className="courses-header">
        <div className="courses-header-content">
          <h1>Khóa Học Phòng Chống Ma Túy</h1>
          <p>Khám phá các khóa học được thiết kế để trang bị kiến thức và kỹ năng cần thiết trong công tác phòng chống ma túy</p>
        </div>
      </div>

      <div className="courses-container">
        <div className="courses-sidebar">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-section">
            <h3><FontAwesomeIcon icon={faFilter} /> Lọc khóa học</h3>
            
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
              <h4>Cấp độ</h4>
              {levels.map(level => (
                <button
                  key={level.id}
                  className={`filter-btn ${selectedLevel === level.id ? 'active' : ''}`}
                  onClick={() => setSelectedLevel(level.id)}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                {course.isLocked && (
                  <div className="course-locked">
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                )}
                {!course.isLocked && course.progress > 0 && (
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span>{course.progress}% hoàn thành</span>
                  </div>
                )}
              </div>
              
              <div className="course-content">
                <div className="course-category">
                  {categories.find(c => c.id === course.category)?.name}
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                
                <div className="course-meta">
                  <span><FontAwesomeIcon icon={faClock} /> {course.duration}</span>
                  <span><FontAwesomeIcon icon={faUsers} /> {course.students} học viên</span>
                  <span><FontAwesomeIcon icon={faStar} /> {course.rating}</span>
                </div>

                <div className="course-footer">
                  <div className="course-lessons">
                    <FontAwesomeIcon icon={faBook} />
                    <span>{course.lessons} bài học</span>
                  </div>
                  {course.isLocked ? (
                    <button className="btn-locked">
                      <FontAwesomeIcon icon={faLock} /> Khóa học
                    </button>
                  ) : course.progress === 100 ? (
                    <button className="btn-completed">
                      <FontAwesomeIcon icon={faCheckCircle} /> Hoàn thành
                    </button>
                  ) : (
                    <button className="btn-continue">
                      {course.progress > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
                      <FontAwesomeIcon icon={faPlayCircle} />
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

export default CoursesPage; 