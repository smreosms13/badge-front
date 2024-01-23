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
  
        const response = await fetch(`${process.env.API_URL}/getAllMyVDBs`, {
          method: 'POST',
          mode: 'no-cors',
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
    <main className="mx-auto max-w-sm h-dvh grid gap-3 shadow-2xl p-6 bg-white">
      <Header />
      <BadgeContainer name={BadgeContainerName} contents={contents} />
      <BtnNav/>
      <VoucherList />
    </main>
  );
}