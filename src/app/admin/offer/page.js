"use client"
import { useState } from "react";
import styled from "styled-components";

import TopBar from "./components/TopBar";
import SendSurveyButton from "./components/SendSurveyButton";
import SurveyList from "./components/SurveyList";
import SelectedBadgeContainer from "./components/SelectedBadgeContainer"
import SelectedBadgeUserCount from "./components/SelectedBadgeUserCount";

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;    
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:not(:first-child) {
    margin-top: 20px;
  }
`


export default function Offer() {

  return (
      <main>
        <MainContainer>
          <TopBar />
          <SurveyList/>
          <SelectedBadgeContainer/>
          <SelectedBadgeUserCount/>
          <SendSurveyButton/>
        </MainContainer>
      </main>
  );
}
