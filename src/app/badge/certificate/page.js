// Page.js
"use client";
import BottomButton from '@/components/ui/BottomButton'; 
import BadgeList from '@/components/homepage/certificate/BadgeList';
import CategoryContainer from '@/components/homepage/certificate/CategoryContainer';
import Link from 'next/link';
import { useState } from 'react';
import SharedPage from './share/page'; // SharedPage를 가져옵니다.
import Sharedimage from './share/sharedimage'; // ImageContext를 가져옵니다.

const categoryMock = [
    {subject: '학적', index:1},
    {subject: '금융', index:2},
    {subject: '의료', index : 3},
    {subject: '자격증', index: 4},
    {subject: '소셜', index: 5},
    {subject: '행정', index:6},
];

export default function Page() {
    const BtnName = "배지 페이지 공유하기";
    const [shareSuccess, setShareSuccess] = useState(false);
    const [images, setImages] = useState([]); // images 상태를 추가합니다.

    const sharePage = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: '이 페이지 공유하기',
                    url: window.location.href,
                });
                setShareSuccess(true);
            } catch (error) {
                console.error('공유 실패', error);
            }
        } else {
            // navigator.share를 지원하지 않는 브라우저에 대한 대체 코드
            navigator.clipboard.writeText(window.location.href);
            setShareSuccess(true);
        }
    };
    
    return (
        <Sharedimage.Provider value={{ images, setImages }}> {/* ImageContext를 제공합니다. */}
            <SharedPage />
            <Link href='./share/selectbadge'>
                <button style={{ backgroundColor: 'black', color: 'white' }}>
                    {'공유할 배지 고르기'}
                </button>
            </Link>
           <button style={{ backgroundColor: 'black', color: 'white' }} onClick={sharePage}>{BtnName}</button>
        </Sharedimage.Provider>
    );
}
