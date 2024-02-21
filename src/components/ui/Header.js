import Link from "next/link";
import { ChevronLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";


export default function Header(){
    const name ='제목'

    return(
        <div className="flex mb-3 w-full">
            <Link
                href='/home'
                className='flex-initial flex justify-center items-center font-black w-8 h-8 rounded-full bg-slate-100 mb-1'
            >                                
                <ChevronLeftIcon className="w-5 h-5"></ChevronLeftIcon>
            </Link>
            {name && (
                <div className="flex-1 font-medium text-lg text-center">
                    <p className="text-black">{name}</p>
                </div>
            )}
            <button
                className='flex-initial flex justify-center items-center font-black w-8 h-8 rounded-full bg-slate-100 mb-1'
            >                                
                <Bars3Icon className="w-5 h-5"></Bars3Icon>
            </button>
            
        </div>
    )
}