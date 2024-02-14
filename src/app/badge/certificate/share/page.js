"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';


export default function Page() {
    const BtnName = "이페이지 공유하기";
    const [selectedImages, setSelectedImages] = useState(() => {
      const savedItems = localStorage.getItem('selectedImages');
      return savedItems ? JSON.parse(savedItems) : [];
    });

   
    const sharePage = async () => {
      if (navigator.share) { // 웹 공유 API를 지원하는지 확인
        try {
          await navigator.share({
            title: document.title, // 페이지 제목
            url: window.location.href // 페이지 URL
          });
        } catch (err) {
          console.error('Failed to share: ', err);
        }
      } else {
        alert('이 브라우저는 웹 공유 API를 지원하지 않습니다.');
      }
    }
    
    return (
        <>
        
            <Link href="/badge/certificate/share/sharing">
              
            <button className= "space-x-2.5"style={{ 
                    backgroundColor: 'black', 
                    color: 'white', 
                    padding: '10px 20px', 
                    border: 'none', 
                    borderRadius: '5px', 
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)' 
                }}>
                    Select badge
                </button>
                
            </Link>
            <div className = {'grid grid-cols-3 gap-2 h-84 overflow-y-scroll p-2 scrollbar-hide'}>
            {selectedImages.map((image, index) => (
              <div key = {index} className={`flex justify-center items-center relative w-20 h-20 rounded-xl `}>
                <Image
                  src={image.image}
                  alt={image.badgeName}
                  layout="fill" 
                  className={`rounded-xl`}
                  style={{ border: selectedImages.includes(image) ? '2px solid blue' : 'none' }}
                ></Image>
                </div>
       
            ))}
          </div>
            
          <button 
                style={{ 
                    backgroundColor: 'black', 
                    color: 'white', 
                    padding: '10px 20px', 
                    border: 'none', 
                    borderRadius: '5px', 
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)' 
                }}
                onClick={sharePage}
            >
                이페이지 공유하기
            </button>
        </>

    );
}