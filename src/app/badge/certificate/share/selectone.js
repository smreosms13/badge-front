"use client"
import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/Context';
import Image from "next/image";
import { IdentificationIcon } from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

function Imageselector({selectedImages, setSelectedImages}){
    const [images, setImages] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const {currentUser} = useAuth();

    const fetchData = async () => {
        try {
  
          const dataToSend = {
              userId : currentUser?.uid,
          }
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/getAllMyVDBs`, dataToSend);
          const data = response.data
          setImages(data);


        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        fetchData();
      }, []);

      const compareId = (image1, image2) => {
        return image1.id === image2.id;
      };

      const toggleImage = (image) => {
        setSelectedImages((prevSelectedImages) =>
          prevSelectedImages.some((i) => compareId(i, image))
            ? prevSelectedImages.filter((i) => !compareId(i, image))
            : [...prevSelectedImages, image]
        );
        setIsChecked(!isChecked); // toggle the checkmark when the image is clicked
      };
      
      useEffect(() => {
        // selectedImages 상태가 변경될 때마다 localStorage에 저장합니다.
        localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
      }, [selectedImages]); // selectedImages가 변경될 때마다 이 useEffect를 실행합니다.
      
      
      function classification ({image}){
        let isValid, isVerified;
        // image 객체의 isValid 속성을 JSON.parse() 메서드에 전달하고, 오류가 발생하면 false로 설정
        try {
          isValid = image.isValid == "true";
        } catch (err) {
          isValid = false;
        }
        // image 객체의 isVerified 속성을 JSON.parse() 메서드에 전달하고, 오류가 발생하면 false로 설정
        try {
          isVerified = image.isVerified == "true";
        } catch (err) {
          isVerified = false;
        }
        return(isValid&&isVerified);
      }
      const isValidImage = (image) => {
        return image && image.image !== '' ;
      };

      const CheckIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-green-500">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );

      return (
        <div>
          {/* 모든 이미지 표시 */}
          <div className={`grid grid-cols-3 gap-2 h-84 overflow-y-scroll p-2 scrollbar-hide `}>
            {images.map((image, index) => (
              <div key={index} className={`flex justify-center items-center relative w-20 h-20 rounded-xl `}>
                <div>
                  {isValidImage(image) ? (   
                    <>
                      <Image
                        src={image.image}
                        alt={image.badgeName}
                        layout="fill" 
                        className={`rounded-xl`}
                        onClick={() => toggleImage(image)}
                        style={{ border: selectedImages.includes(image) ? '2px solid rgba(128, 128, 128, 0.5)'  : 'none' }}
                      ></Image>
                      {JSON.parse(image.isVerified) && (
                        <CheckBadgeIcon className="absolute -right-3 -top-1 w-6 h-6 fill-yellow-400"></CheckBadgeIcon>
                      )}
                      {selectedImages.includes(image) && (
                        <CheckBadgeIcon className="absolute -right-3 -top-1 w-6 h-6 fill-yellow-400"></CheckBadgeIcon>
                      )}
                    </>
                  ) : (
                    <IdentificationIcon className={`w-9 h-9 fill-white ${!isValid? 'brightness-[70%]':''}`}></IdentificationIcon>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Link href="/badge/certificate/share/sharing">
            <div className='flex items-center justify-center flex-1 bg-blue-900 rounded-3xl text-white h-12'>
              go to share page 
            </div>
          </Link>  
        </div>
      );
    

    
}

export default Imageselector;

