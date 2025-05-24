import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './UserProfile.css';

const DoctorProfile = () => {
  const navigate = useNavigate();

  // Mock data - In real app, this would come from your backend
  const doctors = [
    {
      id: 1,
      name: 'Bác sĩ Trần Văn B',
      specialization: 'Tư vấn và điều trị nghiện ma túy',
      experience: '15 năm kinh nghiệm',
      education: 'Bác sĩ Y khoa - Đại học Y Dược TP.HCM',
      workingHours: '08:00 - 17:00 (Thứ 2 - Thứ 6)',
      image: 'https://example.com/doctor1.jpg'
    },
    {
      id: 2,
      name: 'Bác sĩ Lê Thị C',
      specialization: 'Tư vấn tâm lý',
      experience: '10 năm kinh nghiệm',
      education: 'Thạc sĩ Tâm lý học - Đại học Khoa học Xã hội và Nhân văn',
      workingHours: '09:00 - 18:00 (Thứ 2 - Thứ 7)',
      image: 'https://example.com/doctor2.jpg'
    },
    {
      id: 3,
      name: 'Bác sĩ Nguyễn Văn D',
      specialization: 'Điều trị phục hồi',
      experience: '12 năm kinh nghiệm',
      education: 'Bác sĩ Y khoa - Đại học Y Dược Hà Nội',
      workingHours: '08:30 - 16:30 (Thứ 2 - Thứ 6)',
      image: 'https://example.com/doctor3.jpg'
    }
  ];

  const handleBookAppointment = (doctorId) => {
    navigate(`/appointments/new?doctorId=${doctorId}`);
  };

  const handleViewDetails = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  const renderDoctorCard = (doctor) => {
    return (
      <Card key={doctor.id} className="mb-4 doctor-card">
        <Card.Body>
          <Row>
            <Col md={3} className="text-center">
              <div className="doctor-image mb-3">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="img-fluid rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
            </Col>
            <Col md={9}>
              <div className="doctor-info">
                <h4 className="mb-2">{doctor.name}</h4>
                <p className="text-primary mb-3">{doctor.specialization}</p>
                
                <div className="info-grid mb-3">
                  <div className="info-item">
                    <i className="fas fa-graduation-cap me-2"></i>
                    {doctor.education}
                  </div>
                  <div className="info-item">
                    <i className="fas fa-briefcase me-2"></i>
                    {doctor.experience}
                  </div>
                  <div className="info-item">
                    <i className="fas fa-clock me-2"></i>
                    {doctor.workingHours}
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <Button 
                    variant="outline-primary" 
                    className="me-2"
                    onClick={() => handleViewDetails(doctor.id)}
                  >
                    <i className="fas fa-info-circle me-2"></i>
                    Chi tiết
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={() => handleBookAppointment(doctor.id)}
                  >
                    <i className="fas fa-calendar-plus me-2"></i>
                    Đặt lịch
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid className="profile-container">
      <Row>
        <Col>
          <h3 className="mb-4">Danh sách bác sĩ</h3>
          {doctors.map(doctor => renderDoctorCard(doctor))}
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorProfile; 