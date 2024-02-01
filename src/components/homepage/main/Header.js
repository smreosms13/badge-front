"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Context";

export default function Header(){
    const { logout, currentUser } = useAuth()
    console.log(currentUser)
    const router = useRouter()
    async function signOut() {
        try {
            const res = await logout()
            router.push('/')
            // toast({
            //     title: "Message",
            //     description: "logged out successfully",

            // })
            alert("logged out successfully");

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="flex items-center justify-between me-2">
            <Link
                href="/user/profile"
                name="profile"
                className="flex mb-1 items-center"
                >
                <div className="me-2 flex-initial flex justify-center items-center w-10 h-10 rounded-full bg-slate-100">
                    {currentUser.photoURL ? (
                        <Image src={currentUser.photoURL} alt="USER" width={50} height={50} className="rounded-full"/>
                    ): (<UserIcon className="w-6 h-6"></UserIcon>)
                    }
                    
                </div>
                <div className="w-fit">
                    <p className="text-xs text-slate-400 font-poppins">Welcome back</p>
                    <p className="font-medium">{currentUser.displayName}</p>
                </div>
            </Link>
            <div className="flex">
                <Link
                    href='/home'
                    className='flex justify-center items-center font-black w-8 h-8 rounded-full bg-slate-200 mb-1'
                >                                
                    <MagnifyingGlassIcon className="w-5 h-5"></MagnifyingGlassIcon>
                </Link>
                <button 
                    className='bg-slate-400 ml-3 hover:bg-slate-500 rounded-md w-20 flex items-center justify-center p-2 text-sm cursor-pointer text-white' 
                    onClick={() => signOut()}
                >
                    Log out
                </button>  
            </div>
        </div>
    )

}