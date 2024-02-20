"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import BottomButton from "@/components/ui/BottomButton";


export default function Goshare() {
   const router = useRouter(); // instantiate the hook

  const [selectedImages, setSelectedImages] = useState(() => {
    const savedItems = localStorage.getItem('selectedImages');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {

  }, []);

  const handleButtonClick = () => {
    const BadgeIDs = selectedImages.map((image, index) => ({
      [`badge${index + 1}`]: image.id
    }));
  
    const url = 'https://us-central1-openbadges-537a3.cloudfunctions.net/api/createAndPublishCategory';
    const data = {
      "userId": "did:vdb:edb89817-421d-46d9-ad4d-3996230fdb68",
      "categoryName": "To the moon",
      BadgeIDs
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  };
  
  const BtnName = "링크 공유하러 가기";
  

  return (
<>
      {selectedImages.map((image, index) => (
        <div className="flex items-center bg-gray-300 rounded-xl p-4 mb-1">   
          <div key={index} className="relative flex-initial w-24 h-20 rounded-md flex mr-3 justify-center items-center bg-white">
            <Image 
              src={image.image}
              alt={image.badgeName}
              layout="fill"
              className="w-16 h-16 rounded-md"
              style={{ border: selectedImages.includes(image) ? '2px solid blue' : 'none' }}
            />
            </div>
            <div className="flex-1 h-20 justify-center">
            <div className=" font-semibold text-md text-gray-800">
              <p>{image.badgeName}</p>
              {/* <p>{image.userId}</p> */}
              {image.issuer && image.issuer.emailAddress ? <p>{image.issuer.emailAddress}</p> : <p>No Address</p>}
              {image.issuer && image.issuer.affiliation ? <p>{image.issuer.affiliation}</p> : <p>No affiliation</p>}
            </div>
            </div>
          </div>
          
        
      ))}
      <BottomButton name={BtnName} onClick={handleButtonClick}></BottomButton>
      
      </>

  );
  }