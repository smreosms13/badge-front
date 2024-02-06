import BottomButton from '@/components/ui/BottomButton'; 
import BadgeList from '@/components/homepage/certificate/BadgeList';
import Link from 'next/link';


const categoryMock = [
    {subject: '학적', index:1},
    {subject: '금융', index:2},
    {subject: '의료', index : 3},
    {subject: '자격증', index: 4},
    {subject: '소셜', index: 5},
    {subject: '행정', index:6},
];

export default function Page() {
    const BtnName = "새로운 배지 만들기";
    
    return (
        <>
            <Link href="/badge/certificate/share">
              
            <button style={{ 
                    backgroundColor: 'black', 
                    color: 'white', 
                    padding: '10px 20px', 
                    border: 'none', 
                    borderRadius: '5px', 
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)' 
                }}>
                    Select badge
                </button>
                
            </Link>
            <BadgeList></BadgeList>
            <BottomButton name={BtnName}></BottomButton>
        </>

    );
}