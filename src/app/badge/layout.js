"use client"

import Header from "@/components/ui/Header";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Context';

export default function Layout({children}) {
    const { currentUser } = useAuth();
    const router = useRouter();

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