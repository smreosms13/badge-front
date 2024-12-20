"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/Context';
import Image from "next/image";
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

// 공유할 배지를 선택하는 컴포넌트
function BadgeSelector() {
    const [images, setImages] = useState([]);
    // isChecked : 선택했는지 확인하는 state
    const [isChecked, setIsChecked] = useState(false);
    const { currentUser } = useAuth();
    // selectedImages : 선택된 배지를 저장하는 state
    const [selectedImages, setSelectedImages] = useState([]);

    // api : getAllMyVDBs - user의 모든 배지 정보 조회 
    // dataTosend: userId
    const fetchData = async () => {
        try {
            const dataToSend = {
                userId: currentUser?.uid,
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/getAllMyVDBs`, dataToSend);
            const data = response.data;
            setImages(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // local data 중복 방지
    const compareId = (image1, image2) => {
        return image1.id === image2.id;
    };

    // onclick function : image selection 
    const toggleImage = (image) => {
        setSelectedImages((prevSelectedImages) =>
            prevSelectedImages.some((i) => compareId(i, image))
                ? prevSelectedImages.filter((i) => !compareId(i, image))
                : [...prevSelectedImages, image]
        );
        setIsChecked(!isChecked);
    };
    
    // check image src not empty string
    const isValidImage = (image) => {
      return image && image.image !== '' ;
    };

    // localstorage에 선택한 badge 저장
    useEffect(() => {
        localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
    }, [selectedImages]);

    // Verified, Valid badge만 공유 가능하도록 filtering
    const classificationImage = images.filter((image) => (image.isValid === "true") && (image.isVerified === "true"));

    return (
        <div>
            <div className='w-full text-center mb-3 bg-slate-200 rounded-xl text-muted-foreground p-1'>
                <h1>공유할 배지를 선택하세요</h1>
            </div>
            <div className={`grid grid-cols-3 gap-2 h-[28rem] overflow-y-scroll p-2 scrollbar-hide `}>
                {/* 주의 
                    - prototype(2024.02.26) : not Verified, Invalid badge도 공유 가능함.
                    - Verified, Valid badge만 공유 가능하도록 변경 시 아래 코드 활용
                        images.filter() => classificationImage.filter() 
                */}
                {/* 내가 보유한 배지 중 valid image src한 배지만 표시 */}
                {images.filter(isValidImage).map((image, index) => (
                    <div key={index} className={`flex justify-center items-center relative w-20 h-20 rounded-xl `}>
                        <div>
                            <Image
                                src={image.image}
                                alt={image.badgeName}
                                layout="fill"
                                className={`rounded-xl`}
                                onClick={() => toggleImage(image)}
                                style={{ border: selectedImages.includes(image) ? '2px solid blue' : 'none' }}
                            ></Image>
                            {/* 이미지 선택 시 check icon 표시 */}
                            {selectedImages.includes(image) && (
                                <CheckCircleIcon className="absolute -right-3 -top-1 w-6 h-6 fill-blue-700"></CheckCircleIcon>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {/* link share/sharing button */}
            <Link href="/badge/certificate/share/sharing">
                <div className='flex items-center justify-center bg-blue-900 rounded-3xl text-white h-12'>
                    배지 컬렉션 공유하기
                </div>
            </Link>
        </div>
    );
}

export default BadgeSelector;
