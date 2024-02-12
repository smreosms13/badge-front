"use client"
import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '@/context/Context';
import Image from "next/image";

function Imageselector({selectedImages, setSelectedImages}){
    const [images, setImages] = useState([]);

        const {currentUser} = useAuth();

    const fetchData = async () => {
        try {
  
          const dataToSend = {
              userId : currentUser?.uid,
          }
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/getAllMyVDBs`, dataToSend);
          const data = response.data
          const contentsArray = Array.isArray(data) ? data : [data];  
          setImages(contentsArray);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        fetchData();
      }, []);


      const toggleImage = (image) => {
        setSelectedImages((prevSelectedImages) =>
          prevSelectedImages.includes(image)
            ? prevSelectedImages.filter((i) => i !== image)
            : [...prevSelectedImages, image]
        );
      };
      useEffect(() => {
        // selectedImages 상태가 변경될 때마다 localStorage에 저장합니다.
        localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
      }, [selectedImages]); // selectedImages가 변경될 때마다 이 useEffect를 실행합니다.
      
    
      return (
        <div>
          {/* 모든 이미지 표시 */}
                      <div className={`flex justify-center items-center relative w-20 h-20 rounded-xl `}>
                  {images.map((image, index) => (
                <div key={index} className={`flex justify-center items-center relative w-20 h-20 rounded-xl `}>
                  <Image
                    src={image.image}
                    alt={image.badgeName}
                    layout="fill" 
                    className={`rounded-xl`}
                    onClick={() => toggleImage(image)}
                    style={{ border: selectedImages.includes(image) ? '2px solid blue' : 'none' }}
                  ></Image>
                </div>
              ))}
            </div>

    
          {/* 선택한 이미지만 표시 */}
          <div className = {'flex justify-center items-center relative w-20 h-20 rounded-x1 '}>
            {selectedImages.map((image, index) => (
              <div key = {index} className={`flex justify-center items-center relative w-20 h-20 rounded-xl `}>
                <Image
                  src={image.image}
                  alt={image.badgeName}
                  layout="fill" 
                  className={`rounded-xl`}
                  onClick={() => toggleImage(image)}
                  style={{ border: selectedImages.includes(image) ? '2px solid blue' : 'none' }}
                ></Image>
                </div>
       
            ))}
          </div>
        </div>
      );
    

    
}

export default Imageselector;

