import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  border-radius: 15px;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 600;
  }

  p {
    margin: 0.5rem 0 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }
`;

const ProfileHeader = () => {
  return (
    <HeaderContainer>
      <h1>Hồ sơ cá nhân</h1>
      <p>Quản lý thông tin và theo dõi hoạt động phòng chống ma túy của bạn</p>
    </HeaderContainer>
  );
};

export default ProfileHeader; 