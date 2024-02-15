"use client"
import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/Context';
import Image from "next/image";
import { IdentificationIcon } from '@heroicons/react/24/solid';


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
          console.log(data);
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
          // selectedImages 배열에 image의 id와 같은 id를 가진 요소가 있는지 확인
          prevSelectedImages.some((i) => compareId(i, image))
            // 있다면, image를 제외한 나머지 요소들로 이루어진 새로운 배열을 반환
            ? prevSelectedImages.filter((i) => !compareId(i, image))
            // 없다면, image를 포함한 새로운 배열을 반환
            : [...prevSelectedImages, image]
        );
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
      

      return (
        
        <div>
          {/* 모든 이미지 표시 */}
              <div className={`grid grid-cols-3 gap-2 h-84 overflow-y-scroll p-2 scrollbar-hide `}>
                  {images.map((image, index) => (
                <div key={index} className={`flex justify-center items-center relative w-20 h-20 rounded-xl `}>
                
                  <div>
                  {isValidImage(image) ? (   
                    <Image
                      src={image.image}
                      alt={image.badgeName}
                      layout="fill" 
                      className={`rounded-xl`}
                      onClick={() => toggleImage(image)}
                      style={{ border: selectedImages.includes(image) ? '2px solid blue' : 'none' }}
                    ></Image>
                  ) : (
                    <IdentificationIcon className={`w-9 h-9 fill-white ${!isValid? 'brightness-[70%]':''}`}></IdentificationIcon>
                  )}
                  </div>
                  
                </div>
              ))}
            </div>


            

    
          {/* 선택한 이미지만 표시 */}
          <div className = {'grid grid-cols-3 gap-2 h-84 overflow-y-scroll p-2 scrollbar-hide'}>
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

