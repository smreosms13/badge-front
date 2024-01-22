import {
    BeakerIcon,
    LanguageIcon,
    ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline';
import {
    PuzzlePieceIcon,
    RadioIcon,
} from '@heroicons/react/24/solid';
import CardList from '../CardList';

const vouchers = [
    {subject: '현대자동차 인턴 우선채용', href: '/badge/voucher', icon:BeakerIcon, type: 'Skill Achievement Badge',achievement : 100},
    {subject:'신한은행 대출 100만원', href: '/badge/voucher', icon:LanguageIcon, type:'Financial Service Badge', achievement: 80},
    {subject:'현대카드 발급', href:'/badge/voucher', icon:ChatBubbleOvalLeftIcon, type:'Financial Service Badge', achievement:100},
    {subject: '고려대병원 임상실험 대상', href:'/badge/voucher', icon:PuzzlePieceIcon, type:'Skill Achievement Badge', achievement:100},
    {subject: '토스뱅크 개발자 우선채용', href:'/badge/voucher', icon:RadioIcon,  type:'Skill Achievement Badge', achievement:70},
];

export default function VoucherList(){
    const name = '디지털 바우처';
    return(
        <CardList name={name} contents={vouchers}></CardList>
    )
}