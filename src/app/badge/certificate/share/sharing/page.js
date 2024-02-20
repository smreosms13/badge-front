"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Context';


export default function Goshare() {
   const router = useRouter(); // instantiate the hook
   const {currentUser} = useAuth();
   const [categoryName, setCategoryName] = useState('');
   const [categoryId, setCategoryId] = useState('');

  const [selectedImages, setSelectedImages] = useState(() => {
    const savedItems = localStorage.getItem('selectedImages');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    console.log(categoryId);
  }, [categoryId]);

  const handleButtonClick = async () => {
    const BadgeIDs = selectedImages.map((image, index) => ({
      [`badge${index + 1}`]: image.id
    }));
  
    const url = 'https://us-central1-openbadges-537a3.cloudfunctions.net/api/createAndPublishCategory';
    const dataToSend = {
      userId: currentUser?.uid,
      categoryName: categoryName,
      BadgeIDs
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      setCategoryId(data.categotyID);

    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const BtnName = "링크 공유하러 가기";

  const handleShareClick = () => { // 추가: 공유 버튼 클릭 핸들러
    const url = `/showpage/${currentUser?.uid}/${categoryId}`;
    navigator.clipboard.writeText(window.location.origin + url);
    alert('URL이 클립보드에 복사되었습니다!');
  };
  

  return (
<>    
<input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="카테고리 이름을 입력하세요"
      />
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

      <div className="flex items-center justify-center flex-1 bg-blue-900 rounded-3xl text-white h-12" onClick={handleButtonClick}> 카테고리 생성</div>
      <button onClick={handleShareClick}>URL 공유하기</button> 
      
      </>

  );
  }