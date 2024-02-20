"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/Context';
import axios from 'axios';
import Banner from "@/components/homepage/profile/Banner";
const content = {
  subscription : "Sharing"
}
export default function Page() {
  
  const [badge, setBadge] = useState([]);
  const params = useParams();
  const userId = decodeURIComponent(params.userId);
  const categoryId = decodeURIComponent(params.categoryId);


  const url = `https://us-central1-openbadges-537a3.cloudfunctions.net/api/getSingleCategoryByUserID?userID=${userId}&categoryID=${categoryId}`
  

  useEffect(() => {
    fetchData();
}, []);

const fetchData = async () => {
    try {
        const response = await axios.post(url,);
        const data = response?.data
        setBadge(data?.category);
        console.log('badge', badge);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


  return (
  <main className="mx-auto max-w-sm h-dvh flex-col shadow-2xl p-6 bg-red-200">
    <div className="my-3">
      <Banner content={content}></Banner>
    </div>

    <div>
      <div>
        {/* category name */}
      </div>
      <div className="flex flex-wrap">
        {
          badge.length !== 0 ? (
            badge.map((item, index) => (
              <div className="p-3 mb-3 bg-white w-1/2" key={index}>
                <Image src={item.image} width={100} height={100} />
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )
        }
      </div>
      
    </div>
    
    
  </main>
);

  
  


  

  
}
