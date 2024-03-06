import Link from 'next/link';
import BadgeList from '@/components/homepage/certificate/BadgeList';
import CategoryContainer from '@/components/homepage/certificate/CategoryContainer';

// 카테고리 mock 데이터
const categoryMock = [
    {subject: '학적', index:1},
    {subject: '금융', index:2},
    {subject: '의료', index : 3},
    {subject: '자격증', index: 4},
    {subject: '소셜', index: 5},
    {subject: '행정', index:6},
];

// 배지 관리하기 페이지
export default function Page() {    
    return (
        <>
            {/* cateogory */}
            <CategoryContainer contents={categoryMock}/>
            {/* 보유한 Badge List */}
            <BadgeList/>
            <div className="mt-5 w-full flex items-center">
                {/* 배지 생성하기 링크 - 추후 변경 필요*/}
                <Link 
                    name="새로운 배지 만들기"
                    href='/badge/certificate/issue'
                    className="flex items-center justify-center flex-1 bg-blue-900 rounded-3xl text-white h-12 hover:bg-blue-800">
                    <div>새로운 배지 만들기</div>
                </Link>
            </div>
        </>

    );
}