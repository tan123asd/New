import React, { useState } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');

  // Mock data - In real app, this would come from your backend
  const userData = {
    personalInfo: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      status: 'Hoạt động'
    },
    appointments: [
      {
        id: 1,
        doctor: 'Bác sĩ Trần Văn B',
        date: '2024-03-20',
        time: '09:00',
        status: 'Đã xác nhận'
      },
      {
        id: 2,
        doctor: 'Bác sĩ Lê Thị C',
        date: '2024-03-25',
        time: '14:30',
        status: 'Chờ xác nhận'
      }
    ],
    courses: [
      {
        id: 1,
        title: 'Nhận biết và phòng tránh ma túy',
        progress: 75,
        status: 'Đang học'
      },
      {
        id: 2,
        title: 'Kỹ năng từ chối ma túy',
        progress: 30,
        status: 'Đang học'
      }
    ],
    surveys: [
      {
        id: 1,
        title: 'Khảo sát đánh giá kiến thức',
        status: 'Đã hoàn thành',
        date: '2024-03-15'
      },
      {
        id: 2,
        title: 'Khảo sát mức độ hiểu biết',
        status: 'Chưa hoàn thành',
        date: '2024-03-20'
      }
    ],
    programs: [
      {
        id: 1,
        title: 'Chương trình tư vấn nhóm',
        date: '2024-03-22',
        time: '15:00',
        status: 'Đã đăng ký'
      }
    ]
  };

  const handleNewAppointment = () => {
    navigate('/appointments/new');
  };

  const handleViewAllCourses = () => {
    navigate('/courses');
  };

  const handleViewAllSurveys = () => {
    navigate('/surveys');
  };

  const handleViewAllPrograms = () => {
    navigate('/programs');
  };

  const renderPersonalInfo = () => {
    return (
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Thông tin cá nhân</h5>
        </Card.Header>
        <Card.Body>
          <div className="text-center mb-4">
            <div className="avatar-placeholder">
              <i className="fas fa-user fa-3x"></i>
            </div>
            <h4 className="mt-3 mb-2">{userData.personalInfo.name}</h4>
            <span className="badge bg-success mb-3">
              <i className="fas fa-circle me-1"></i>
              {userData.personalInfo.status}
            </span>
            <p className="text-muted mb-0">
              <i className="fas fa-envelope me-2"></i>
              {userData.personalInfo.email}
            </p>
          </div>
          <div className="text-center mt-4">
            <Button variant="outline-danger">
              <i className="fas fa-key me-2"></i>
              Đổi mật khẩu
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderAppointments = () => {
    return (
      <Card>
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Lịch hẹn tư vấn</h5>
        </Card.Header>
        <Card.Body>
          {userData.appointments.map((appointment) => {
            return (
              <div key={appointment.id} className="appointment-item">
                <div className="appointment-header">
                  <h6>
                    <i className="fas fa-user-md me-2"></i>
                    {appointment.doctor}
                  </h6>
                  <span className={`status-badge ${appointment.status === 'Đã xác nhận' ? 'confirmed' : 'pending'}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="appointment-details">
                  <p className="mb-1">
                    <i className="far fa-calendar-alt me-2"></i>
                    Ngày: {appointment.date}
                  </p>
                  <p className="mb-0">
                    <i className="far fa-clock me-2"></i>
                    Giờ: {appointment.time}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleNewAppointment}>
              <i className="fas fa-plus me-2"></i>
              Đặt lịch mới
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderCourses = () => {
    return (
      <Card>
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Khóa học đang tham gia</h5>
        </Card.Header>
        <Card.Body>
          {userData.courses.map((course) => {
            return (
              <div key={course.id} className="course-item">
                <h6>
                  <i className="fas fa-book me-2"></i>
                  {course.title}
                </h6>
                <div className="progress mb-2">
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ width: `${course.progress}%` }}
                    aria-valuenow={course.progress} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    {course.progress}%
                  </div>
                </div>
                <span className="status-badge">
                  <i className="fas fa-spinner fa-spin me-1"></i>
                  {course.status}
                </span>
              </div>
            );
          })}
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleViewAllCourses}>
              <i className="fas fa-list me-2"></i>
              Xem tất cả khóa học
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderSurveys = () => {
    return (
      <Card>
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Khảo sát</h5>
        </Card.Header>
        <Card.Body>
          {userData.surveys.map((survey) => {
            return (
              <div key={survey.id} className="survey-item">
                <h6>
                  <i className="fas fa-clipboard-list me-2"></i>
                  {survey.title}
                </h6>
                <div className="survey-details">
                  <span className={`status-badge ${survey.status === 'Đã hoàn thành' ? 'confirmed' : 'pending'}`}>
                    {survey.status}
                  </span>
                  <p className="mb-0">
                    <i className="far fa-calendar-alt me-2"></i>
                    Ngày: {survey.date}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleViewAllSurveys}>
              <i className="fas fa-list me-2"></i>
              Xem tất cả khảo sát
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderPrograms = () => {
    return (
      <Card>
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Chương trình tham gia</h5>
        </Card.Header>
        <Card.Body>
          {userData.programs.map((program) => {
            return (
              <div key={program.id} className="program-item">
                <h6>
                  <i className="fas fa-users me-2"></i>
                  {program.title}
                </h6>
                <div className="program-details">
                  <p className="mb-1">
                    <i className="far fa-calendar-alt me-2"></i>
                    Ngày: {program.date}
                  </p>
                  <p className="mb-1">
                    <i className="far fa-clock me-2"></i>
                    Giờ: {program.time}
                  </p>
                  <span className="status-badge confirmed">
                    <i className="fas fa-check-circle me-1"></i>
                    {program.status}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleViewAllPrograms}>
              <i className="fas fa-list me-2"></i>
              Xem tất cả chương trình
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid className="profile-container">
      <Row>
        <Col md={3} className="left-sidebar">
          {renderPersonalInfo()}
        </Col>
        <Col md={9} className="main-content">
          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <Nav variant="tabs" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="appointments">
                  <i className="fas fa-calendar-alt me-2"></i>
                  Lịch hẹn
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="courses">
                  <i className="fas fa-book me-2"></i>
                  Khóa học
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="surveys">
                  <i className="fas fa-clipboard-list me-2"></i>
                  Khảo sát
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="programs">
                  <i className="fas fa-users me-2"></i>
                  Chương trình
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="appointments">
                {renderAppointments()}
              </Tab.Pane>
              <Tab.Pane eventKey="courses">
                {renderCourses()}
              </Tab.Pane>
              <Tab.Pane eventKey="surveys">
                {renderSurveys()}
              </Tab.Pane>
              <Tab.Pane eventKey="programs">
                {renderPrograms()}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile; 