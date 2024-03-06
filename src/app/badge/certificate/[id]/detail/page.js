"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'
import BadgeDetail from '@/components/homepage/certificate/BadgeDetail';
import axios from 'axios';
import { useAuth } from '@/context/Context';

// 배지 상세 페이지
export default function Page() {
    // url parameter에서 badgeID 추출
    const params = useParams();
    const badgeID = decodeURIComponent(params.id);
    // 로그인한 User 정보
    const { currentUser } = useAuth();
    // 배지 상세 정보를 담을 state
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    
    // badge data fetch 하는 비동기 함수
    const fetchData = async () => {
        try {
            //request body 정의
            const dataToSend = {
                userId : currentUser?.uid,
                badgeID : badgeID
            }

            // 배지 상세 정보 api(/getVDBByUserIDAndBadgeID) 호출
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/getVDBByUserIDAndBadgeID`, dataToSend
            );
            const data = response.data
            
            // check data type == dict
            const contentDict = Array.isArray(data) ? data[0] : data;

            setContent(contentDict);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
        {/* content load 완료 후 상세정보 표시 */}
            {content ? 
            (<>
                <BadgeDetail content={content}></BadgeDetail>
            </>
            ) : (
                <p>Loading...</p>
            ) }
        </>
    );
}