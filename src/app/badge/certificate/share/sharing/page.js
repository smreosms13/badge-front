"use client"
import { useState } from "react";
import Image from "next/image";
import { useAuth } from '@/context/Context';

// Category(collection) 생성 및 공유할 링크 생성 page
export default function Goshare() {
    const { currentUser } = useAuth();
    // categoryName - user가 입력한 name
    const [categoryName, setCategoryName] = useState('');
    // categoryId - category 생성 후 response되는 id
    const [categoryId, setCategoryId] = useState('');

    // localstorage에서 selectedImages 불러오기
    const [selectedImages, setSelectedImages] = useState(() => {
        const savedItems = localStorage.getItem('selectedImages');
        return savedItems ? JSON.parse(savedItems) : [];
    });

    // 이전 페이지에서 선택한 badge들만 표시
    const handleButtonClick = async () => {

        // 선택한 badge(image)의 ID들을 dict에 넣기
        const BadgeIDs = selectedImages.map((image, index) => ({
            [`badge${index + 1}`]: image.id
        }));

        /* 선택한 badge들을 하나의 category에 담기
            api : createAndPublishCategory
            dataToSend : userId, categoryName, badgeIds
            categoryname : 사용자 지정
        */
        const url = 'https://us-central1-openbadges-537a3.cloudfunctions.net/api/createAndPublishCategory';
        const dataToSend = {
            userId: currentUser?.uid,
            categoryName: categoryName,
            BadgeIDs
        };

        // category 생성 api 호출
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
            setCategoryId(data.categotyID);
            alert('새로운 컬렉션이 완성되었습니다!');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // URL 공유 버튼 onClick funtion
    const handleShareClick = () => {
        const url = `/showpage/${currentUser?.uid}/${categoryId}`;
        navigator.clipboard.writeText(window.location.origin + url);
        alert('컬렉션의 URL이 클립보드에 복사되었습니다!');
    };

    return (
        <>
            {/* collection name input and button */}
            <div className="flex mb-4 h-11">
                <div className="flex items-center justify-center flex-1 bg-blue-600 rounded-2xl mr-3 px-5">
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="배지 컬렉션 이름을 입력하세요"
                        className="p-1 text-black bg-white rounded-md focus:outline-none w-full"
                    />
                </div>
                <button type="submit" className="flex items-center justify-center bg-blue-600 rounded-2xl w-11 shadow hover:shadow-[10px 5px 5px 10px] hover:shadow-[#262d43] transition-duration-400 ease-in-out" onClick={handleButtonClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                </button>
            </div>
            {/* show selected badge list */}
            <div className="h-[28rem] overflow-y-scroll p-2 scrollbar-hide">
                {selectedImages.map((image, index) => (
                    <div key={index} className="flex items-center bg-gray-200 rounded-xl p-4 mb-4">
                        <div key={index} className="relative flex-initial w-24 h-20 rounded-md flex mr-3 justify-center items-center bg-white">
                            <Image
                                src={image.image}
                                alt={image.badgeName}
                                layout="fill"
                                className="w-16 h-16 rounded-md"
                            />
                        </div>
                        <div className="flex-1 h-20 justify-center">
                            <div className="font-semibold text-md text-gray-800">
                                <p>{image.badgeName}</p>
                                <p className="text-md text-muted-foreground">{badge?.dataBadgeClaim?.subject}</p>
                                <p className="text-sm text-muted-foreground">{badge?.dataBadgeClaim?.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* sharing link button to showpage/userId/categoryId */}
            <button className='cursor-pointer flex items-center justify-center w-full bg-blue-900 rounded-3xl text-white h-12' onClick={handleShareClick}>배지 컬렉션 URL 공유하기</button>
        </>
    );
}