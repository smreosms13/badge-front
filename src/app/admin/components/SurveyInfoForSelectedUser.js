import { useState } from "react";
import styled, { ServerStyleSheet } from "styled-components";
import surveyInfo from "../json/surveyInfo.json"
import Image from "next/image";


const Container = styled.div`
    width: 350px;
    height: 600px;
    background-color: white;
    border-radius: 14px;

    display: flex;
    flex-direction: column;
    overflow-y: auto;
`


const SurveyInfoContainer = styled.div`
    position: relative;
    width: 335px;
    height: 116px;  
    padding : 10px;
    display: flex; 
    margin-bottom: 26px;
    justify-content: space-between;
    border: 1.5px solid #eee; 
    border-radius: 14px; 
    flex-direction: column;
    &:hover{
        background-color: #F0f0f0;
    }
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
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 5px;  
  margin-top: 5px;
`;

const SelectButton = styled.button`
    position: absolute;
    width:100%;
    height: 100%;
    z-index: 10;
    background-color: transparent;
`

const CheckVerified = styled.img`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px; // 적절한 이미지 크기를 설정하세요.
  height: 20px; // 적절한 이미지 크기를 설정하세요.
`;

function Survey ({survey,selected, onSelect, onDeselect}) {
    const { surveyId, date, isBadgeOwner, institutionName, image,  surveyName } = survey;
    return (
<SurveyInfoContainer>
        <SurveyTop>
          <div style={{color: "#7E848D"}}>{date}</div>
          <div style={{color: "#FF3F60"}}>{isBadgeOwner ? "검증배지소유자 대상" : "검증배지소유자 비대상"}</div>
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
        {selected && <CheckVerified src={"/check-verified-01.png"} alt="Check Verified" />}
        {selected 
        ? <SelectButton onClick={() => onDeselect(surveyId)}/>
        : <SelectButton onClick={() => onSelect(survey)}/>}
      </SurveyInfoContainer>
    )
}

export default function SurveyInfoForSelectedUser({selectedSurveys,setSelectedSurveys} ){

    const handleSelect = (survey) => {
        setSelectedSurveys(prev => [...prev, survey]);
    }

    const handleDeselect = (surveyId) => {
        setSelectedSurveys(prev => prev.filter(survey => survey.surveyId !== surveyId));
    }
    return(
        <Container>
            {surveyInfo.contents.map(survey => (
        <Survey
          key={survey.surveyId}
          survey={survey}
          selected={!!selectedSurveys.find(s => s.surveyId === survey.surveyId)}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
        />
      ))}
        </Container>
    )
}