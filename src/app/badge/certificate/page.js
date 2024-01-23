

import BottomButton from "@/app/ui/BottomButton";
import Badge from "@/app/ui/certificate/Badge";
import BadgeList from "@/app/ui/certificate/BadgeList";
import CategoryContainer from "@/app/ui/certificate/CategoryContainer";

import {
    BeakerIcon,
    LanguageIcon,
    ChatBubbleOvalLeftIcon,
    CubeIcon,
    PuzzlePieceIcon,
    RadioIcon,
} from '@heroicons/react/24/solid';


const badgesMock = [
    {subject:'트위터 골드', href: '/badge/certificate/info', icon:BeakerIcon, isValid: true, isVerified: true},
    {subject:'IBM', href: '/badge/certificate/info', icon:LanguageIcon, isValid: true, isVerified: true},
    {subject:'하나은행VIP', href:'/badge/certificate/info', icon:ChatBubbleOvalLeftIcon, isValid: true, isVerified: false},
    {subject: '대한항공', href:'/badge/certificate/info', icon:PuzzlePieceIcon, isValid: true, isVerified: true},
    {subject: '토익900', href:'/badge/certificate/info', icon:RadioIcon, isValid: true, isVerified: false},
    {subject: 'BMW클럽', href:'/badge/certificate/info', icon:CubeIcon, isValid: false, isVerified: true},    // Invalid    
    {subject:'A연구소', href: '/badge/certificate/info', icon:BeakerIcon, isValid: true, isVerified: true},
    {subject:'한자1급', href: '/badge/certificate/info', icon:LanguageIcon, isValid: true, isVerified: true},
    {subject:'카카오톡', href:'/badge/certificate/info', icon:ChatBubbleOvalLeftIcon, isValid: true, isVerified: false},
    {subject: '퍼즐마스터', href:'/badge/certificate/info', icon:PuzzlePieceIcon, isValid: true, isVerified: true},
    {subject: 'MBC라디오', href:'/badge/certificate/info', icon:RadioIcon, isValid: true, isVerified: false},
    {subject: 'Cube엔터', href:'/badge/certificate/info', icon:CubeIcon, isValid: true, isVerified: true},

];

const categoryMock = [
    {subject: '학적', index:1},
    {subject: '금융', index:2},
    {subject: '의료', index : 3},
    {subject: '자격증', index: 4},
    {subject: '소셜', index: 5},
    {subject: '행정', index:6},
];

export default function Page() {
    const BtnName = "새로운 배지 만들기"
    return (
        <>
            <CategoryContainer contents={categoryMock}></CategoryContainer>
            <BadgeList contents={badgesMock} CustomCard={Badge}></BadgeList>
            <BottomButton name={BtnName}></BottomButton>
        </>

    );
}