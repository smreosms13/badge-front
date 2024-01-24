"use client"
import { useState, useEffect } from 'react';

import BadgeContainer from "./ui/main/BadgeContainer";
import BtnNav from "./ui/BtnNav";
import VoucherList from "./ui/main/VoucherList";
import Header from "./ui/main/Header";

export default function Page() {
  const [contents, setContents] = useState(null);
  const BadgeContainerName = '디지털 증명서';

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
    <main className="mx-auto max-w-sm h-dvh grid gap-3 shadow-2xl p-6 bg-white">
      <Header />
      <BadgeContainer name={BadgeContainerName} contents={contents} />
      <BtnNav/>
      <VoucherList />
    </main>
  );
}