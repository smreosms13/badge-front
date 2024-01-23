"use client"

import {
    BeakerIcon,
    LanguageIcon,
    ChatBubbleOvalLeftIcon,
    CubeIcon,
    PuzzlePieceIcon,
    RadioIcon,
} from '@heroicons/react/24/solid';
import CarouselContainer from '../CarouselContainer';
import Badge from '../Badge';

// mock data, move to the dummy page
const badgesMock = [
    {subject:'트위터 골드', href: '/badge/certificate', icon:BeakerIcon, isValid: true, isVerified: true},
    {subject:'IBM', href: '/badge/certificate', icon:LanguageIcon, isValid: true, isVerified: true},
    {subject:'하나은행VIP', href:'/badge/certificate', icon:ChatBubbleOvalLeftIcon, isValid: true, isVerified: false},
    {subject: '대한항공', href:'/badge/certificate', icon:PuzzlePieceIcon, isValid: true, isVerified: true},
    {subject: '토익900', href:'/badge/certificate', icon:RadioIcon, isValid: true, isVerified: false},
    {subject: 'BMW클럽', href:'/badge/certificate', icon:CubeIcon, isValid: false, isVerified: true},    // Invalid    
    {subject:'A연구소', href: '/badge/certificate', icon:BeakerIcon, isValid: true, isVerified: true},
    {subject:'한자1급', href: '/badge/certificate', icon:LanguageIcon, isValid: true, isVerified: true},
    {subject:'카카오톡', href:'/badge/certificate', icon:ChatBubbleOvalLeftIcon, isValid: true, isVerified: false},
    {subject: '퍼즐마스터', href:'/badge/certificate', icon:PuzzlePieceIcon, isValid: true, isVerified: true},
    {subject: 'MBC라디오', href:'/badge/certificate', icon:RadioIcon, isValid: true, isVerified: false},
    {subject: 'Cube엔터', href:'/badge/certificate', icon:CubeIcon, isValid: true, isVerified: true},

];

export default function BadgeContainer({name, contents=badgesMock}) {
    return(
        <>
            <div className="flex flex-col rounded-3xl h-48 bg-blue-950 p-2">
                <div className="mb-2 text-center">
                    <p className="text-white text-lg">{name}</p>
                </div>
                <CarouselContainer contents={contents} CarouselComponent={Badge}></CarouselContainer>
            </div>
        </>
    )

};