import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './UserProfile.css';

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - In real app, this would come from your backend
  const doctor = {
    id: parseInt(id),
    name: 'Bác sĩ Trần Văn B',
    specialization: 'Tư vấn và điều trị nghiện ma túy',
    experience: '15 năm kinh nghiệm',
    education: 'Bác sĩ Y khoa - Đại học Y Dược TP.HCM',
    workingHours: '08:00 - 17:00 (Thứ 2 - Thứ 6)',
    image: 'https://example.com/doctor1.jpg',
    expertise: [
      'Điều trị nghiện ma túy',
      'Tư vấn tâm lý',
      'Phục hồi chức năng',
      'Tư vấn gia đình'
    ],
    educationHistory: [
      {
        degree: 'Bác sĩ Y khoa',
        school: 'Đại học Y Dược TP.HCM',
        year: '2005-2011'
      },
      {
        degree: 'Thạc sĩ Tâm lý học',
        school: 'Đại học Khoa học Xã hội và Nhân văn',
        year: '2011-2013'
      }
    ],
    certificates: [
      'Chứng chỉ hành nghề Y khoa',
      'Chứng chỉ Tư vấn tâm lý',
      'Chứng chỉ Điều trị nghiện chất'
    ],
    achievements: [
      'Giải thưởng Bác sĩ xuất sắc năm 2020',
      'Nghiên cứu về phương pháp điều trị mới',
      'Đào tạo hơn 1000 bác sĩ trẻ'
    ]
  };

  const handleBookAppointment = () => {
    navigate(`/appointments/new?doctorId=${doctor.id}`);
  };

  return (
    <Container fluid className="profile-container">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="doctor-image mb-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="img-fluid rounded-circle"
                  style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/200';
                  }}
                />
              </div>
              <h3 className="mb-3">{doctor.name}</h3>
              <p className="text-primary mb-3">{doctor.specialization}</p>
              
              <div className="info-list mb-4">
                <div className="info-item mb-2">
                  <i className="fas fa-graduation-cap me-2"></i>
                  {doctor.education}
                </div>
                <div className="info-item mb-2">
                  <i className="fas fa-briefcase me-2"></i>
                  {doctor.experience}
                </div>
                <div className="info-item">
                  <i className="fas fa-clock me-2"></i>
                  {doctor.workingHours}
                </div>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                onClick={handleBookAppointment}
              >
                <i className="fas fa-calendar-plus me-2"></i>
                Đặt lịch tư vấn
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-4">Chuyên môn</h4>
              <ul className="list-unstyled">
                {doctor.expertise.map((item, index) => (
                  <li key={index} className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-4">Học vấn & Chứng chỉ</h4>
              {doctor.educationHistory.map((edu, index) => (
                <div key={index} className="mb-3">
                  <h5>{edu.degree}</h5>
                  <p className="mb-1">{edu.school}</p>
                  <small className="text-muted">{edu.year}</small>
                </div>
              ))}
              <hr />
              <h5 className="mb-3">Chứng chỉ</h5>
              <ul className="list-unstyled">
                {doctor.certificates.map((cert, index) => (
                  <li key={index} className="mb-2">
                    <i className="fas fa-certificate text-warning me-2"></i>
                    {cert}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h4 className="mb-4">Thành tựu</h4>
              <ul className="list-unstyled">
                {doctor.achievements.map((achievement, index) => (
                  <li key={index} className="mb-3">
                    <i className="fas fa-trophy text-warning me-2"></i>
                    {achievement}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDetail; 