import Link from "next/link";
import { ChevronLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

function getName(pathname){
    switch (pathname) {
        case "/badge/certificate/issue":
            return "배지 만들기";
        case "/badge/certificate/share":
           return "배지 공유하기";
        case "/badge/certificate/share/sharing":
            return "공유할 배지 선택하기"  
        case "/badge/certificate":
            return "배지 관리하기"
        case "/user/profile":
            return "나의 프로필"
        case "/user/mystory":
            return "나의 이력"
        // Add more cases for other paths if needed
        default:
            return "VDB Application"; // Default name
    }
}

export default function Header(){
    const pathname = usePathname()
    console.log(pathname)
    const name = getName(pathname);


    return(
        <div className="flex mb-3 w-full">
            <Link
                href='/home'
                className='flex-initial flex justify-center items-center font-black w-10 h-10 rounded-full bg-slate-100 mb-1'
            >                                
                <ChevronLeftIcon className="w-6 h-6"></ChevronLeftIcon>
            </Link>
            {name && (
                <div className="flex-1 font-medium text-lg text-center">
                    <p>{name}</p>
                </div>
            )}
            <button
                className='flex-initial flex justify-center items-center font-black w-10 h-10 rounded-full bg-slate-100 mb-1'
            >                                
                <Bars3Icon className="w-6 h-6"></Bars3Icon>
            </button>
            
        </div>
    )
}