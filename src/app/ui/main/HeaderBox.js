import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";

import Link from "next/link";

const userMock = { name: "Adela Parkson", img: 'https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png' };

export default function HeaderBox({user=userMock}){
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
                href='/user'
                className='flex justify-center items-center font-black w-8 h-8 rounded-full bg-slate-100 mb-1'
            >                                
                <MagnifyingGlassIcon className="w-4 h-4"></MagnifyingGlassIcon>
            </Link>
        </div>
    )

}