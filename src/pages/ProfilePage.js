import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";

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

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123456789",
    dateOfBirth: "01/01/1990",
    address: "123 Đường ABC, Quận XYZ, TP.HCM",
    education: "Đại học ABC",
    occupation: "Sinh viên",
    interests: "Công nghệ, Du lịch, Âm nhạc"
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

  return (
    <ProfileContainer>
      <ProfileHeader>
        <h1>Hồ sơ cá nhân</h1>
        <p>Quản lý thông tin cá nhân của bạn</p>
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
          </ProfileSection>

          <ProfileSection>
            <ProfileTitle>Thông tin bổ sung</ProfileTitle>
            <ProfileInfo>
              <ProfileLabel>Học vấn</ProfileLabel>
              {isEditing ? (
                <ProfileInput
                  value={editedProfile.education}
                  onChange={(e) => handleChange("education", e.target.value)}
                />
              ) : (
                <ProfileValue>{profile.education}</ProfileValue>
              )}
            </ProfileInfo>
            <ProfileInfo>
              <ProfileLabel>Nghề nghiệp</ProfileLabel>
              {isEditing ? (
                <ProfileInput
                  value={editedProfile.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                />
              ) : (
                <ProfileValue>{profile.occupation}</ProfileValue>
              )}
            </ProfileInfo>
            <ProfileInfo>
              <ProfileLabel>Sở thích</ProfileLabel>
              {isEditing ? (
                <ProfileInput
                  value={editedProfile.interests}
                  onChange={(e) => handleChange("interests", e.target.value)}
                />
              ) : (
                <ProfileValue>{profile.interests}</ProfileValue>
              )}
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
          <ProfileSection>
            <ProfileTitle>Hoạt động gần đây</ProfileTitle>
            {/* Có thể thêm các hoạt động như lịch sử đánh giá, khóa học đã tham gia, etc. */}
          </ProfileSection>
        </ProfileCard>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default ProfilePage; 