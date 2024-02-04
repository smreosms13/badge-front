import React from 'react';
import users from '../json/users.json'; // 사용자 데이터를 임포트합니다.
import styled from 'styled-components';

const UserCountContainer = styled.div`
    width: 335px;
    height: 116px;  // 세로 크기를 500px로 고정
    padding: 10px;  
    display: flex; 
    justify-content: center;
    align-items: center;
    border: 1px solid #eee; 
    border-radius: 15px; 
`
const UserCountText = styled.span`
    width: 200px;
    font-size: 20px;
    font-weight: 500;
`
const UserCountImg = styled.img`
    width: 120px;
    height: 70px;
`

const SelectedBadgeUserCount = ({ selectedBadges= [], onUsers = [] }) => {
  // 선택한 모든 뱃지를 가진 사용자들을 찾습니다.
  const usersWithSelectedBadges = users.filter(user =>
    selectedBadges.every(selectedBadge =>
      user.badges.some(badge => badge === selectedBadge.id)
    )
  );

  const sendToPage = () => {
    onUsers(usersWithSelectedBadges)
  }

  return (
    <UserCountContainer>
        <UserCountImg src="/user-icon.png"></UserCountImg>
        <UserCountText>선택된 사용자: {usersWithSelectedBadges.length}</UserCountText>
    </UserCountContainer>
  );
}

export default SelectedBadgeUserCount;