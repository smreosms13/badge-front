"use client"
import { useState, useEffect } from 'react';

import BottomButton from "@/app/ui/BottomButton";
import Badge from "@/app/ui/certificate/Badge";
import BadgeList from "@/app/ui/certificate/BadgeList";
import CategoryContainer from "@/app/ui/certificate/CategoryContainer";

const categoryMock = [
    {subject: '학적', index:1},
    {subject: '금융', index:2},
    {subject: '의료', index : 3},
    {subject: '자격증', index: 4},
    {subject: '소셜', index: 5},
    {subject: '행정', index:6},
];

export default function Page() {
    const BtnName = "새로운 배지 만들기";
    const [contents, setContents] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userId = "did:vdb:edb89817-421d-46d9-ad4d-3996230fdb68";
    
          const response = await fetch('https://us-central1-openbadges-537a3.cloudfunctions.net/api/getAllMyVDBs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
            }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          // Ensure contents is an array
          const contentsArray = Array.isArray(data) ? data : [data];
    
          setContents(contentsArray);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);

    return (
        <>
            <CategoryContainer contents={categoryMock}></CategoryContainer>
            {contents ?(<BadgeList contents={contents} CustomCard={Badge}></BadgeList>):(<p>Loading</p>)}
            <BottomButton name={BtnName}></BottomButton>
        </>

    );
}