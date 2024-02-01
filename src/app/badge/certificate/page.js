"use client"
import { useState, useEffect } from 'react';

import BottomButton from '@/components/ui/BottomButton'; 
import Badge from '@/components/homepage/certificate/Badge';
import BadgeList from '@/components/homepage/certificate/BadgeList';
import CategoryContainer from '@/components/homepage/certificate/CategoryContainer';

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
    
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllMyVDBs`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*', // Replace '*' with the specific origin(s) you want to allow
              'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
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