import styled from "styled-components";
import surveyInfo from '../json/surveyInfo.json'
import Image from "next/image";

const SurveyInfoContainer = styled.div`
    width: 335px;
    height: 116px;  
    padding: 10px;  
    display: flex; 
    justify-content: space-between;
    align-items: center;
    border: 1px solid #eee; 
    border-radius: 15px; 
    flex-direction: column;
`

const SurveyTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;

const SurveyBottom = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 23px;
  font-weight: 500;
  margin-bottom: 10px;  
  
`;

export default function SurveyInfoForSelectedUser(){
    const { date, isBadgeOwner, institutionName, image,  surveyName } = surveyInfo;

    return(
      <SurveyInfoContainer>
        <SurveyTop>
          <div sty>{date}</div>
          <div>{isBadgeOwner ? "검증배지소유자 대상" : "검증배지소유자 비대상"}</div>
        </SurveyTop>
        <SurveyBottom>
            <Image 
                src={image} 
                alt="institution image"
                width={50}
                height={50}
            />
          <div>{surveyName}</div>
        </SurveyBottom>
      </SurveyInfoContainer>
    )
}