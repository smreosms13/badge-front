"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/Context';
import Image from "next/image";
import { IdentificationIcon } from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';


function Imageselector() {
    const [images, setImages] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const { currentUser } = useAuth();
    const [selectedImages, setSelectedImages] = useState([]);

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

    const compareId = (image1, image2) => {
        return image1.id === image2.id;
    };

    const toggleImage = (image) => {
        setSelectedImages((prevSelectedImages) =>
            prevSelectedImages.some((i) => compareId(i, image))
                ? prevSelectedImages.filter((i) => !compareId(i, image))
                : [...prevSelectedImages, image]
        );
        setIsChecked(!isChecked);
    };
    const isValidImage = (image) => {
      return image && image.image !== '' ;
    };

    useEffect(() => {
        localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
    }, [selectedImages]);

    const classificationImage = images.filter((image) => (image.isValid === "true") && (image.isVerified === "true"));

    return (
        <div>
            <div className={`grid grid-cols-3 gap-2 h-84 overflow-y-scroll p-2 scrollbar-hide `}>
                {classificationImage.filter(isValidImage).map((image, index) => (
                    <div key={index} className={`flex justify-center items-center relative w-20 h-20 rounded-xl `}>
                        <div>
                                    <Image
                                        src={image.image}
                                        alt={image.badgeName}
                                        layout="fill"
                                        className={`rounded-xl`}
                                        onClick={() => toggleImage(image)}
                                        style={{ border: selectedImages.includes(image) ? '2px solid rgba(128, 128, 128, 0.5)' : 'none' }}
                                    ></Image>
                                    {selectedImages.includes(image) && (
                                        <CheckBadgeIcon className="absolute -right-3 -top-1 w-6 h-6 fill-blue-400"></CheckBadgeIcon>
                                    )}
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/badge/certificate/share/sharing">
                <div className='flex items-center justify-center flex-1 bg-blue-900 rounded-3xl text-white h-12'>
                    링크 공유하러 가기
                </div>
            </Link>
        </div>
    );
}

export default Imageselector;

