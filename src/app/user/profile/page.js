import Table from "@/components/homepage/profile/Table";
import { CardList } from "@/components/ui/Card";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

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

const LinkCard = ({ content }) => {
    return (
        <Link
            href={content.href}
            name={content.subject}
            className="flex justify-between border mb-1 p-2 items-center"
        >
            <p className="font-medium text-sm">{content.subject}</p>
            <ChevronRightIcon className="flex-initial w-5 h-5 stroke-slate-600" />
        </Link>
    );
};

export default function Profile() {
    const name = 'My Story';
    return(
        <>
            <Table content={userMock}></Table>
            <CardList name={name} contents={myStory} CustomCard={LinkCard}></CardList>
        </>
    )
}