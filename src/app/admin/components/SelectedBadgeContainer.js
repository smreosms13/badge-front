import styled from "styled-components"
import { useState } from "react";
import ReactModal from "react-modal";
import badges from "../json/badgeList.json"

const BadgeContainer = styled.div`
    width: 335px;
    height: 203px; 
    padding: 10px;  
    display: flex; 
    justify-content: space-between;
    border: 1px solid #eee; 
    border-radius: 15px; 
`;

const AddButtonContainer = styled.div`
    width: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AddButton = styled.button`
    width: 48px;
    height: 48px;
    border-radius: 50%;  
    border: 1px solid #0066FF;  
    cursor: pointer; 

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 35px;
    font-weight: 80;
    color: #0066FF;
`;

const AddText = styled.span`
    /* 텍스트 스타일 */
    font-size: 11px;
    font-weight: 300;
`;

const BadgeList = styled.div`
  display: flex;
  overflow-x: auto;
  align-items: center;
  margin-left: 10px;

  & > *:not(:first-child) {
    margin-left: 10px;
  }
`;

const Badge = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 15px;

    background-color: ${(props) => (props.isSelected ? "black" : "transparent")};

    cursor: pointer; 
    font-size: 10px;
    font-weight: 80;
    flex-shrink: 0;  
    overflow: hidden;
    &:hover {
    background-color: #f0f0f0;  // 마우스 오버시 배경색 변경
  }
    
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-gap: 10px;
  margin-left: 10%;
  transform: translate(-5%);
`;

const ModalCloseButton = styled.button`
    width: 400px;
    height: 50px;  // 세로 크기를 500px로 고정
    margin: 10%;  
    left: 20%;
    justify-content: center;
    align-items: center;
    border: 0; 
    border-radius: 15px; 
    background-color: #073355;
    color: white;
    &:hover {
    background-color: #104070;
    }
`
const BadgeImage = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;  
    padding: 4px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.3); 
`;

const BadgeName = styled.span`
  /* 이름 스타일 */
`;





export default function SelectedBadgeContainer({ onSelectedBadges }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedBadges, setSelectedBadges] = useState([]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
      sendToPage()
    };

    const sendToPage = () => {
        onSelectedBadges(selectedBadges);
    }

    const handleBadgeClick = (badge) => {
        // 이미 선택된 뱃지인지 확인
        const isBadgeSelected = selectedBadges.find(
          (selectedBadge) => selectedBadge.id === badge.id  // id를 사용하여 뱃지 확인
        );
    
        // 이미 선택된 뱃지라면 함수를 종료
        if (isBadgeSelected) {
            setSelectedBadges((prevBadges) =>
              prevBadges.filter((prevBadge) => prevBadge.id !== badge.id)
            );
          } else {
            // 선택된 뱃지 추가
            setSelectedBadges((prevBadges) => [...prevBadges, badge]);
          }
      };
      {badges.map((badge, index) => {
        const isSelected = selectedBadges.find(
          (selectedBadge) => selectedBadge.id === badge.id
        );
      
        return (
          <Badge
            key={index}
            onClick={() => handleBadgeClick(badge)}
            isSelected={!!isSelected}
          >
            <BadgeImage src={badge.image} />
            <BadgeName>{badge.name}</BadgeName>
          </Badge>
        );
      })}

    return (
        <div>
            <BadgeContainer>
                <AddButtonContainer>
                    <AddButton onClick={openModal}>+</AddButton>
                    <ReactModal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      contentLabel="Select Badges"
                    >
                            <BadgeGrid>
                            {badges.map((badge, index) => (
                            <Badge key={index} onClick={() => handleBadgeClick(badge)}>
                                <BadgeImage src={badge.image}/>
                                <BadgeName>{badge.name}</BadgeName>
                            </Badge>
                            ))}
                            </BadgeGrid>
                            <ModalContent>

                            <ModalCloseButton onClick={closeModal}>선택 완료</ModalCloseButton>
                            </ModalContent>
                    </ReactModal>
                    <AddText>Add</AddText>
                </AddButtonContainer>
                <BadgeList>
                    {selectedBadges.map((badge, index) => (
                    <Badge key={index}>
                        <BadgeImage src={badge.image}/>
                        <BadgeName>{badge.name}</BadgeName>
                    </Badge>
                    ))}
                    
                </BadgeList>
            </BadgeContainer>
        </div>
    )
}