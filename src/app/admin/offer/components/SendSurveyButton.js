import Link from "next/link";
import styled from "styled-components";


const SendButton = styled.button`
    width: 335px;
    height: 45px;  // 세로 크기를 500px로 고정
    padding: 10px;  
    display: flex; 
    justify-content: center;
    align-items: center;
    border: 0; 
    border-radius: 15px; 
    background-color: #27426A;
    color: white;
    &:hover {
    background-color: #10223A;  // 마우스 오버시 배경색 변경
  }
`

export default function SendSurveyButton({users = []}){
    const handleSurveyButton = () => {
    }
    return(
        <Link href="/admin/offer">
            <SendButton onClick={handleSurveyButton}>써베이 오퍼하기</SendButton>
        </Link>
    )
}