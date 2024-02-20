"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Context";
import { useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  


export default function Header(){
    const { logout, currentUser } = useAuth()
    console.log(currentUser)
    const [isLoading, setIsLoading]=useState(false)
    const router = useRouter()
    async function signOut() {
        try {
            setIsLoading(true)
            const res = await logout()
            router.push('/')
            // toast({
            //     title: "Message",
            //     description: "logged out successfully",

            // })
            alert("logged out successfully");

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return(
        <div className="flex items-center justify-between mb-1">
            <div>
                <DropdownMenu>
                    <div className="flex">
                        <DropdownMenuTrigger>
                        <div className="me-2 flex-initial flex justify-center items-center w-10 h-10 rounded-full bg-slate-100">
                            {!isLoading && currentUser?.photoURL ? (
                                <Image src={currentUser?.photoURL} alt="USER" width={50} height={50} className="rounded-full"/>
                            ): (<UserIcon className="w-6 h-6"></UserIcon>)
                            }
                            
                        </div>
                        </DropdownMenuTrigger>
                        <div className="w-fit">
                            <p className="text-xs text-slate-400 font-poppins">Welcome back</p>
                            <p className="font-medium">{currentUser?.displayName}</p>
                        </div>
                    </div>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                        <Link href="/user/profile" name="profile" className="flex mb-1 items-center">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <button onClick={() => signOut()}>Log out</button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex">
                <Link
                    href='/home'
                    className='flex justify-center items-center font-black w-8 h-8 rounded-full bg-slate-200 mb-1 mr-2'
                >                                
                    <MagnifyingGlassIcon className="w-5 h-5"></MagnifyingGlassIcon>
                </Link>
                <ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon"/>
            </div>
        </div>
    )

}