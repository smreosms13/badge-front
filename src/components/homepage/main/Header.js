"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Context";

const userMock = { name: "Adela Parkson", img: 'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png' };

export default function Header({user=userMock}){
    const { logout } = useAuth()
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
        <div className="flex items-center me-2">
            <Link
                href="/user/profile"
                name="profile"
                className="flex flex-grow mb-1 me-2 items-center"
                >
                <div className="me-2 flex-initial flex justify-center items-center w-10 h-10 rounded-full bg-slate-100">
                    {user.img && (
                    <img
                        src={user.img}
                        width={50}
                        height={50}
                        className="w-8 h-8 rounded-full"
                    ></img>
                    )}
                    {!user.img && <UserIcon className="w-6 h-6"></UserIcon>}
                </div>
                <div>
                    <p className="text-xs text-slate-300 font-poppins">Welcome back</p>
                    <p className="font-medium">{user.name}</p>
                </div>
            </Link>
            <Link
                href='/home'
                className='flex justify-center items-center font-black w-8 h-8 rounded-full bg-slate-100 mb-1'
            >                                
                <MagnifyingGlassIcon className="w-4 h-4"></MagnifyingGlassIcon>
            </Link>
            <button 
                className='bg-gradient-to-r from-slate-400 to-slate-600 ml-3 hover:bg-slate-700 rounded-md w-20 flex items-center justify-center p-2 text-sm cursor-pointer text-white' 
                onClick={() => signOut()}
            >
                Log out
            </button>
        </div>
    )

}