"use client"
import { useState } from "react";
import Image from "next/image";
import { useAuth } from '@/context/Context';
/* category 생성 및 공유할 링크 생성 page */

export default function Goshare() {
    // categoryID != categoryName name은 유저가 설정 및 보이는 이름, id는 api 전송용 
    const { currentUser } = useAuth();
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [selectedImages, setSelectedImages] = useState(() => {
        const savedItems = localStorage.getItem('selectedImages');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    /* 전 페이지에서 선택한 badge들만 show */
    const handleButtonClick = async () => {
        const BadgeIDs = selectedImages.map((image, index) => ({
            [`badge${index + 1}`]: image.id
        }));
        /* 선택한 badge들 1개의 category에 담기 
        api : createAndPublishCategory
        datatosend : currentuserid, categoryname, badgeIds
        categoryname : 사용자가 지정해서 생성
        */

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
            alert('새로운 컬렉션이 완성되었습니다!');
        } catch (error) {
            console.error('Error:', error);
        }
    };
    /* link 공유 onclik function */

    const handleShareClick = () => {
        const url = `/showpage/${currentUser?.uid}/${categoryId}`;
        navigator.clipboard.writeText(window.location.origin + url);
        alert('컬렉션의 URL이 클립보드에 복사되었습니다!');
    };

    return (
        <>
        {/* make collection button
            collection name needed
            */}
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
                                {/* image information 있는지 확인 */}
                                {image.issuer && image.issuer.emailAddress ? <p>{image.issuer.emailAddress}</p> : <p>No Address</p>}
                                {image.issuer && image.issuer.affiliation ? <p>{image.issuer.affiliation}</p> : <p>No affiliation</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* sharing link button
                to  showpage/userId/categoryid
                */}
            <button className='cursor-pointer flex items-center justify-center w-full bg-blue-900 rounded-3xl text-white h-12' onClick={handleShareClick}>배지 컬렉션 URL 공유하기</button>
        </>
    );
}