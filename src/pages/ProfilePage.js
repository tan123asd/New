import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, 
  FaEdit, FaSave, FaTimes, FaBook, FaGraduationCap, FaClipboardList, 
  FaComments, FaCalendarCheck, FaUsers, FaChartLine, FaShieldAlt 
} from "react-icons/fa";

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  border-radius: 15px;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileSection = styled.div`
  margin-bottom: 2rem;
`;

const ProfileTitle = styled.h2`
  color: #1a237e;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProfileLabel = styled.span`
  color: #666;
  width: 120px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileValue = styled.span`
  color: #333;
  flex: 1;
`;

const ProfileInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1a237e;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;

  &.edit {
    background-color: #1a237e;
    color: white;
    &:hover {
      background-color: #0d47a1;
    }
  }

  &.save {
    background-color: #4caf50;
    color: white;
    &:hover {
      background-color: #388e3c;
    }
  }

  &.cancel {
    background-color: #f44336;
    color: white;
    &:hover {
      background-color: #d32f2f;
    }
  }
`;

const RecentActivitiesSection = styled(ProfileSection)`
  margin-top: 0;
`;

const ActivityCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ActivityIcon = styled.div`
  background: #e3f2fd;
  color: #3f51b5;
  padding: 0.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  min-width: 45px;
  height: 45px;

  &.assessment {
    background: #fff3e0;
    color: #f57c00;
  }

  &.counseling {
    background: #e8f5e9;
    color: #2e7d32;
  }

  &.education {
    background: #e3f2fd;
    color: #1976d2;
  }

  &.community {
    background: #f3e5f5;
    color: #7b1fa2;
  }
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;
`;

const ActivityTime = styled.span`
  color: #666;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.5rem;
`;

const ActivityDescription = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ActivityStatus = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.5rem;

  &.completed {
    background-color: #e8f5e9;
    color: #2e7d32;
  }

  &.in-progress {
    background-color: #fff3e0;
    color: #f57c00;
  }

  &.upcoming {
    background-color: #e3f2fd;
    color: #1976d2;
  }

  &.high-risk {
    background-color: #ffebee;
    color: #c62828;
  }

  &.medium-risk {
    background-color: #fff3e0;
    color: #ef6c00;
  }

  &.low-risk {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
`;

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
    <ProfileContainer>
      <ProfileHeader>
        <h1>Hồ sơ cá nhân</h1>
        <p>Quản lý thông tin và theo dõi hoạt động phòng chống ma túy của bạn</p>
      </ProfileHeader>

      <ProfileContent>
        <ProfileCard>
          <ProfileSection>
            <ProfileTitle>Thông tin cơ bản</ProfileTitle>
            <ProfileInfo>
              <ProfileLabel>
                <FaUser /> Họ và tên
              </ProfileLabel>
              {isEditing ? (
                <ProfileInput
                  value={editedProfile.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />
              ) : (
                <ProfileValue>{profile.fullName}</ProfileValue>
              )}
            </ProfileInfo>
            <ProfileInfo>
              <ProfileLabel>
                <FaEnvelope /> Email
              </ProfileLabel>
              {isEditing ? (
                <ProfileInput
                  value={editedProfile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              ) : (
                <ProfileValue>{profile.email}</ProfileValue>
              )}
            </ProfileInfo>
            <ProfileInfo>
              <ProfileLabel>
                <FaPhone /> Số điện thoại
              </ProfileLabel>
              {isEditing ? (
                <ProfileInput
                  value={editedProfile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              ) : (
                <ProfileValue>{profile.phone}</ProfileValue>
              )}
            </ProfileInfo>
            <ProfileInfo>
              <ProfileLabel>
                <FaCalendarAlt /> Ngày sinh
              </ProfileLabel>
              {isEditing ? (
                <ProfileInput
                  value={editedProfile.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                />
              ) : (
                <ProfileValue>{profile.dateOfBirth}</ProfileValue>
              )}
            </ProfileInfo>
            <ProfileInfo>
              <ProfileLabel>
                <FaMapMarkerAlt /> Địa chỉ
              </ProfileLabel>
              {isEditing ? (
                <ProfileInput
                  value={editedProfile.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              ) : (
                <ProfileValue>{profile.address}</ProfileValue>
              )}
            </ProfileInfo>
            <ProfileInfo>
              <ProfileLabel>
                <FaShieldAlt /> Vai trò
              </ProfileLabel>
              <ProfileValue>{profile.role}</ProfileValue>
            </ProfileInfo>
            <ProfileInfo>
              <ProfileLabel>
                <FaUsers /> Sở thích
              </ProfileLabel>
              <ProfileValue>{profile.interests}</ProfileValue>
            </ProfileInfo>
          </ProfileSection>
          <ButtonGroup>
            {isEditing ? (
              <>
                <Button className="save" onClick={handleSave}>
                  <FaSave /> Lưu thay đổi
                </Button>
                <Button className="cancel" onClick={handleCancel}>
                  <FaTimes /> Hủy
                </Button>
              </>
            ) : (
              <Button className="edit" onClick={handleEdit}>
                <FaEdit /> Chỉnh sửa
              </Button>
            )}
          </ButtonGroup>
        </ProfileCard>

        <ProfileCard>
          <RecentActivitiesSection>
            <ProfileTitle>Hoạt động gần đây</ProfileTitle>
            {recentActivities.map(activity => (
              <ActivityCard key={activity.id}>
                <ActivityIcon className={activity.type}>
                  {activity.type === 'assessment' && <FaClipboardList />}
                  {activity.type === 'education' && <FaBook />}
                  {activity.type === 'counseling' && <FaComments />}
                  {activity.type === 'community' && <FaUsers />}
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>{activity.title}</ActivityTitle>
                  <ActivityTime>{activity.time}</ActivityTime>
                  <ActivityDescription>{activity.description}</ActivityDescription>
                  <ActivityStatus className={activity.status}>
                    {activity.status === 'completed' && 'Hoàn thành'}
                    {activity.status === 'in-progress' && 'Đang thực hiện'}
                    {activity.status === 'upcoming' && 'Sắp diễn ra'}
                  </ActivityStatus>
                  {activity.riskLevel && (
                    <ActivityStatus className={activity.riskLevel}>
                      {activity.riskLevel === 'high-risk' && 'Nguy cơ cao'}
                      {activity.riskLevel === 'medium-risk' && 'Nguy cơ trung bình'}
                      {activity.riskLevel === 'low-risk' && 'Nguy cơ thấp'}
                    </ActivityStatus>
                  )}
                </ActivityContent>
              </ActivityCard>
            ))}
          </RecentActivitiesSection>
        </ProfileCard>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfilePage; 