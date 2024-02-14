import BottomButton from '@/components/ui/BottomButton'; 
import BadgeList from '@/components/homepage/certificate/BadgeList';
import CategoryContainer from '@/components/homepage/certificate/CategoryContainer';

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
            <CategoryContainer contents={categoryMock}></CategoryContainer>
            <BadgeList></BadgeList>
            <BottomButton name={BtnName}></BottomButton>
        </>

    );
}