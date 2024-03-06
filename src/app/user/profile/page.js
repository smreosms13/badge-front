import UserInfo from "@/components/homepage/profile/UserInfo";
import { CardList, LinkCard } from "@/components/ui/Card";

// user data (mock)
const userMock = { 
    name: "Adela Parkson", 
    email: "adelaPakerson@gmail.com", 
    phone:"+880171254835", 
    birthday: "2000-09-28",
    img: 'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png', subscription:'Product Manager' 
};

// mystory category (mock)
const myStory = [
    {subject:'수상 이력', href: '/user/mystory',  },
    {subject:'학교 정보', href: '/user/mystory',  },
    {subject:'의료, 헬스 이력', href:'/user/mystory',},
    {subject: '신용 정보', href:'/user/mystory',   },
    {subject: '게임 이력', href:'/user/mystory',},
];

// profile 페이지
export default function Profile() {
    return(
        <>
            <UserInfo content={userMock}></UserInfo>
            <CardList name="My Story" contents={myStory} CustomCard={LinkCard}></CardList>
        </>
    )
}