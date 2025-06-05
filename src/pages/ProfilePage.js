import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, 
  FaEdit, FaSave, FaTimes, FaBook, FaGraduationCap, FaClipboardList, 
  FaComments, FaCalendarCheck, FaUsers, FaChartLine, FaShieldAlt 
} from "react-icons/fa";
import './ProfilePage.css';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    dateOfBirth: '01/01/2000',
    address: '123 Đường ABC, Quận XYZ, TP.HCM',
    role: 'Học sinh',
    interests: 'Tham gia các hoạt động phòng chống ma túy, Tư vấn đồng đẳng'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const recentActivities = [
    {
      id: 1,
      type: 'assessment',
      title: 'Hoàn thành đánh giá ASSIST',
      description: 'Đã hoàn thành bài đánh giá nguy cơ sử dụng ma túy',
      time: '2 giờ trước',
      status: 'completed',
      riskLevel: 'low-risk'
    },
    {
      id: 2,
      type: 'education',
      title: 'Tham gia khóa học "Phòng chống ma túy học đường"',
      description: 'Đang tham gia khóa học trực tuyến về phòng chống ma túy',
      time: '1 ngày trước',
      status: 'in-progress'
    },
    {
      id: 3,
      type: 'counseling',
      title: 'Đặt lịch tư vấn với chuyên gia',
      description: 'Đã đặt lịch tư vấn trực tuyến với chuyên gia tâm lý',
      time: '2 ngày trước',
      status: 'upcoming'
    },
    {
      id: 4,
      type: 'community',
      title: 'Tham gia chương trình "Phòng chống ma túy học đường"',
      description: 'Đăng ký tham gia chương trình giáo dục cộng đồng',
      time: '3 ngày trước',
      status: 'upcoming'
    }
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Hồ sơ cá nhân</h1>
        <p>Quản lý thông tin và theo dõi hoạt động phòng chống ma túy của bạn</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-section">
            <h2 className="profile-title">Thông tin cơ bản</h2>
            <div className="profile-info">
              <span className="profile-label">
                <FaUser /> Họ và tên
              </span>
              {isEditing ? (
                <input
                  type="text"
                  className="profile-input"
                  value={editedProfile.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
              ) : (
                <span className="profile-value">{profile.fullName}</span>
              )}
            </div>
            <div className="profile-info">
              <span className="profile-label">
                <FaEnvelope /> Email
              </span>
              {isEditing ? (
                <input
                  type="email"
                  className="profile-input"
                  value={editedProfile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              ) : (
                <span className="profile-value">{profile.email}</span>
              )}
            </div>
            <div className="profile-info">
              <span className="profile-label">
                <FaPhone /> Số điện thoại
              </span>
              {isEditing ? (
                <input
                  type="tel"
                  className="profile-input"
                  value={editedProfile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              ) : (
                <span className="profile-value">{profile.phone}</span>
              )}
            </div>
            <div className="profile-info">
              <span className="profile-label">
                <FaCalendarAlt /> Ngày sinh
              </span>
              {isEditing ? (
                <input
                  type="text"
                  className="profile-input"
                  value={editedProfile.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                />
              ) : (
                <span className="profile-value">{profile.dateOfBirth}</span>
              )}
            </div>
            <div className="profile-info">
              <span className="profile-label">
                <FaMapMarkerAlt /> Địa chỉ
              </span>
              {isEditing ? (
                <input
                  type="text"
                  className="profile-input"
                  value={editedProfile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              ) : (
                <span className="profile-value">{profile.address}</span>
              )}
            </div>
            <div className="profile-info">
              <span className="profile-label">
                <FaShieldAlt /> Vai trò
              </span>
              <span className="profile-value">{profile.role}</span>
            </div>
            <div className="profile-info">
              <span className="profile-label">
                <FaUsers /> Sở thích
              </span>
              <span className="profile-value">{profile.interests}</span>
            </div>
          </div>
          <div className="button-group">
            {isEditing ? (
              <>
                <button className="button save" onClick={handleSave}>
                  <FaSave /> Lưu thay đổi
                </button>
                <button className="button cancel" onClick={handleCancel}>
                  <FaTimes /> Hủy
                </button>
              </>
            ) : (
              <button className="button edit" onClick={handleEdit}>
                <FaEdit /> Chỉnh sửa
              </button>
            )}
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-section recent-activities">
            <h2 className="profile-title">Hoạt động gần đây</h2>
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-card">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === 'assessment' && <FaClipboardList />}
                  {activity.type === 'education' && <FaBook />}
                  {activity.type === 'counseling' && <FaComments />}
                  {activity.type === 'community' && <FaUsers />}
                </div>
                <div className="activity-content">
                  <h4 className="activity-title">{activity.title}</h4>
                  <span className="activity-time">{activity.time}</span>
                  <p className="activity-description">{activity.description}</p>
                  <span className={`activity-status ${activity.status}`}>
                    {activity.status === 'completed' && 'Hoàn thành'}
                    {activity.status === 'in-progress' && 'Đang thực hiện'}
                    {activity.status === 'upcoming' && 'Sắp diễn ra'}
                  </span>
                  {activity.riskLevel && (
                    <span className={`activity-status ${activity.riskLevel}`}>
                      {activity.riskLevel === 'high-risk' && 'Nguy cơ cao'}
                      {activity.riskLevel === 'medium-risk' && 'Nguy cơ trung bình'}
                      {activity.riskLevel === 'low-risk' && 'Nguy cơ thấp'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 