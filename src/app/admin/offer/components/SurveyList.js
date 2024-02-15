import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

import styled from "styled-components";

const Container = styled.div`
    width: 335px;
    height: 116px;  
    padding: 10px;  
    display: flex; 
    justify-content: center;
    align-items: center;
    border: 1.5px solid #eee; 
    border-radius: 14px; 
    flex-direction: column;
    font-size: 22px;
    font-weight: 500;
`

export default function SurveyList() {
    const [surveyName, setSurveyName] = useState("선택된 써베이 없음")
    const [surveyCount, setSurveyCount] = useState("")
    const searchParams = useSearchParams()

    useEffect(() => {
        console.log(searchParams)
        const surveyName = searchParams.get('surveyName')
        const surveyCount = searchParams.get('surveyCount')
        console.log("surveys: " + surveyName)
          if (surveyCount > 0) {
            setSurveyName(surveyName);
            if (surveyCount>1)
                setSurveyCount(`외 ${surveyCount - 1}건`);
          }
        
      }, [searchParams]);
    
    return (
        <Container>
            {surveyName} {surveyCount}
        </Container>
    );
}
