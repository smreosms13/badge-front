import Link from "next/link";
import { ChevronLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

// pathname에 따라 페이지 이름 변경
function getName(pathname){
    if (pathname.startsWith("/badge/certificate/") && pathname.endsWith("/detail")) {
        return "나의 배지 정보";
    }
    switch (pathname) {
        case "/badge/certificate/issue":
            return "배지 만들기";
        case "/badge/certificate/share":
           return "배지 공유하기";
        case "/badge/certificate/share/sharing":
            return "배지 공유하기"  
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

// 메인 페이지를 제외한 Header
export default function Header(){
    const pathname = usePathname()
    const name = getName(pathname);

    return(
        <div className="flex mb-3 w-full">
            {/* 이전 페이지 이동, 현재는 무조건 메인페이지로 이동하는 데 향후 수정 요망 */}
            <Link
                href='/home'
                className='flex-initial flex justify-center items-center font-black w-10 h-10 rounded-full bg-slate-100 mb-1'
            >                                
                <ChevronLeftIcon className="w-6 h-6"></ChevronLeftIcon>
            </Link>
            {/* 페이지 제목 */}
            {name && (
                <div className="flex-1 font-medium text-lg text-center">
                    <p className="text-black">{name}</p>
                </div>
            )}
            {/* 메뉴 버튼 - 향후 개발 요망 */}
            <button
                className='flex-initial flex justify-center items-center font-black w-10 h-10 rounded-full bg-slate-100 mb-1'
            >                                
                <Bars3Icon className="w-6 h-6"></Bars3Icon>
            </button>
            
        </div>
    )
}