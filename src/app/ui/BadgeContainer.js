"use client"

import {
    BeakerIcon,
    LanguageIcon,
    ChatBubbleOvalLeftIcon,
    CubeIcon,
    PuzzlePieceIcon,
    RadioIcon,
} from '@heroicons/react/24/solid';
import BadgeCarousel from './BadgeCarousel';

// mock data, move to the dummy page
const badges = [
    {subject:'트위터 골드', href: '/badge/certificate', icon:BeakerIcon, isVaild: true, isVerified: true},
    {subject:'IBM', href: '/badge/certificate', icon:LanguageIcon, isVaild: true, isVerified: true},
    {subject:'하나은행VIP', href:'/badge/certificate', icon:ChatBubbleOvalLeftIcon, isVaild: true, isVerified: false},
    {subject: '대한항공', href:'/badge/certificate', icon:PuzzlePieceIcon, isVaild: true, isVerified: true},
    {subject: '토익900', href:'/badge/certificate', icon:RadioIcon, isVaild: true, isVerified: false},
    {subject: 'BMW클럽', href:'/badge/certificate', icon:CubeIcon, isVaild: false, isVerified: true},    // Invalid    
    {subject:'A연구소', href: '/badge/certificate', icon:BeakerIcon, isVaild: true, isVerified: true},
    {subject:'한자1급', href: '/badge/certificate', icon:LanguageIcon, isVaild: true, isVerified: true},
    {subject:'카카오톡', href:'/badge/certificate', icon:ChatBubbleOvalLeftIcon, isVaild: true, isVerified: false},
    {subject: '퍼즐마스터', href:'/badge/certificate', icon:PuzzlePieceIcon, isVaild: true, isVerified: true},
    {subject: 'MBC라디오', href:'/badge/certificate', icon:RadioIcon, isVaild: true, isVerified: false},
    {subject: 'Cube엔터', href:'/badge/certificate', icon:CubeIcon, isVaild: true, isVerified: true},

];

const filterValid = (contents) => {
    return contents.filter(element => element.isVaild === true);
};

export default function BadgeContainer({name}) {
    const maxBadgesPerBox = 6;
    const badgeGroups = [];
    const badgesValid = filterValid(badges); // array of valid badges

    // Slice badgesValid into chunks of maxBadgesPerBox.
    for(let i=0;i<badgesValid.length;i+=maxBadgesPerBox){
        badgeGroups.push(badgesValid.slice(i, i+maxBadgesPerBox));
    }

    return(
        <>
            <div className="flex flex-col rounded-3xl h-48 bg-blue-950 p-2">
                <div className="mb-2 text-center">
                    <p className="text-white text-lg">{name}</p>
                </div>
                <BadgeCarousel badgeGroups={badgeGroups}></BadgeCarousel>
            </div>
        </>
    )

};