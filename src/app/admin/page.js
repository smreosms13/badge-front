"use client"
import { useState } from "react";
import styled from "styled-components";

import Head from "next/head";
import TopBar from "./components/TopBar";
import SendSurveyButton from "./components/SendSurveyButton";
import SurveyInfoForSelectedUser from "./components/SurveyInfoForSelectedUser";

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


export default function AdminHomePage() {
  const [selectedSurveys, setSelectedSurveys] = useState([]);

  return (
    <div>
      <Head>
        <title>Admin Home</title>
      </Head>

      <main>
        <MainContainer>
          <TopBar />
          <SurveyInfoForSelectedUser selectedSurveys={selectedSurveys} setSelectedSurveys={setSelectedSurveys}/>
          <SendSurveyButton surveys={selectedSurveys}/>
        </MainContainer>
      </main>
    </div>
  );
}
