import styled from 'styled-components'
import Link from 'next/link';

const TopBarContainer = styled.div`
    width: 335px;
    display: flex;
    padding: 10px;
    background-color: white;
    justify-content: space-between;
    align-items: center;

  // 모바일 화면을 위한 스타일
  @media (max-width: 768px) {
    flex-direction: row;
  }

  // 태블릿 화면을 위한 스타일
  @media (min-width: 769px) and (max-width: 1024px) {
    flex-direction: row;
  }

  // 데스크탑 화면을 위한 스타일
  @media (min-width: 1025px) {
    flex-direction: row;
  }
`;

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%; 
  background-color: #F4F4F4; 
  border: none;  
  cursor: pointer; 
  font-size: 20px;
  color: black;
  &:hover {
    background-color: #D0D0D0;  // 마우스 오버시 배경색 변경
  }
`;

const Title = styled.h1`
  /* 제목 스타일 */
  height: 40px;
  height: 100%;
  font-size: 16px;
  font-weight: 350;
`;

const ExitButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;  
  background-color: #F4F4F4;  
  border: none;  
  cursor: pointer; 

  font-size: 18px;
  color: black;
  &:hover {
    background-color: #D0D0D0;  // 마우스 오버시 배경색 변경
  }
`;

export default function TopBar() {
    return (
        <div>
            <TopBarContainer>
                <Link href="/admin">
                <BackButton>{'<'}</BackButton>
                </Link>
                <Title>직원 {'>'} 써베이 배포하기</Title>
                <ExitButton>{'x'}</ExitButton>
                
            </TopBarContainer>
        </div>
    )
}


