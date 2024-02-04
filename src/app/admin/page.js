"use client"
import { useState } from "react";
import styled from "styled-components";

import Head from "next/head";
import TopBar from "./components/TopBar";
import SelectedBadgeContainer from "./components/SelectedBadgeContainer";
import SelectedBadgeUserCount from "./components/SelectedBadgeUserCount";
import SendSurveyButton from "./components/SendSurveyButton";
import SurveyInfoForSelectedUser from "./components/SurveyInfoForSelectedUser";

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > *:not(:first-child) {
    margin-top: 20px;
  }

`


export default function AdminHomePage() {
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectedBadges = (badges) => {
    setSelectedBadges(badges);
  }

  const handleSelectedUsers = (users) => {
    setSelectedUsers(users);
  }


  return (
    <div>
      <Head>
        <title>Admin Home</title>
      </Head>

      <main>
          
        <MainContainer>
          <TopBar />
          <SelectedBadgeContainer onSelectedBadges={handleSelectedBadges}/>
          <SelectedBadgeUserCount selectedBadges={selectedBadges} onUsers={handleSelectedUsers}/>
          <SurveyInfoForSelectedUser/>
          <SendSurveyButton users={selectedUsers}/>
        </MainContainer>
      </main>
    </div>
  );
}
