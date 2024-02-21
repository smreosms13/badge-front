"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from '@/context/Context';

export default function Goshare() {
    const { currentUser } = useAuth();
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [selectedImages, setSelectedImages] = useState(() => {
        const savedItems = localStorage.getItem('selectedImages');
        return savedItems ? JSON.parse(savedItems) : [];
    });

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
            alert('새로운 카테고리가 추가되었습니다');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleShareClick = () => {
        const url = `/showpage/${currentUser?.uid}/${categoryId}`;
        navigator.clipboard.writeText(window.location.origin + url);
        alert('URL이 클립보드에 복사되었습니다!');
    };

    return (
        <>
            <div className="flex items-center justify-center flex-1 bg-blue-900 rounded-3xl text-white h-12 mb-4">
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="카테고리 이름을 입력하세요"
                    className="px-2 py-1 text-black bg-white rounded-md focus:outline-none"
                />
            </div>
            {selectedImages.map((image, index) => (
                <div key={index} className="flex items-center bg-gray-300 rounded-xl p-4 mb-4">
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
                        <div className="font-semibold text-md text-gray-800">
                            <p>{image.badgeName}</p>
                            {image.issuer && image.issuer.emailAddress ? <p>{image.issuer.emailAddress}</p> : <p>No Address</p>}
                            {image.issuer && image.issuer.affiliation ? <p>{image.issuer.affiliation}</p> : <p>No affiliation</p>}
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex items-center justify-center flex-1 bg-blue-900 rounded-3xl text-white h-12 mb-4" onClick={handleButtonClick}>카테고리 생성</div>
            <div className='flex items-center justify-center flex-1 bg-blue-900 rounded-3xl text-white h-12' onClick={handleShareClick}>URL 공유하기</div>
        </>
    );
}