"use client"

import Header from "@/components/ui/Header";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Context';

// /badge 하위 페이지 레이아웃
export default function Layout({children}) {
    const { currentUser } = useAuth();
    const router = useRouter();
    
    // 로그인 하지 않을 시 로그인 페이지로 이동
    // 로그인 완료 시 페이지 렌더링
    if(!currentUser){
        router.push('/')
    }
    else{
        return (
            <div className="mx-auto max-w-sm h-dvh flex flex-col shadow-2xl px-6 py-8 bg-white">
                <Header></Header>
                <div className="w-full">
                    {children}
                </div>
            </div>
        );
    }
}