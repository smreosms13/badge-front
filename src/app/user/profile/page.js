import Table from "@/app/ui/profile/Table";
import Banner from "@/app/ui/profile/Banner";
import CardList from "@/app/ui/CardList";
import LinkCard from "@/app/ui/profile/LinkCard";

const userMock = { 
    name: "Adela Parkson", 
    email: "adelaPakerson@gmail.com", 
    phone:"+880171254835", 
    birthday: "2000-09-28",
    img: 'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png', subscription:'Product Manager' 
};

const myStory = [
    {subject:'수상 이력', href: '/user/mystory',  },
    {subject:'학교 정보', href: '/user/mystory',  },
    {subject:'의료, 헬스 이력', href:'/user/mystory',},
    {subject: '신용 정보', href:'/user/mystory',   },
    {subject: '게임 이력', href:'/user/mystory',},
];

export default function Profile() {
    const name = 'My Story';
    return(
        <div className="mx-auto max-w-sm h-dvh flex flex-col shadow-2xl p-6 bg-white">
            <Banner user={userMock}></Banner>
            <Table user={userMock}></Table>
            <CardList name={name} contents={myStory} CustomCard={LinkCard}></CardList>
        </div>
    )
}