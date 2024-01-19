'use client';

import Link from "next/link";
import {
    PlusCircleIcon,
    ShareIcon,
    Cog8ToothIcon,
} from '@heroicons/react/24/outline';

// move to dummy pages
const links = [
    {name:'배지 만들기', href: '/badge', icon:PlusCircleIcon},
    {name:'배지 공유하기', href: '/badge', icon:ShareIcon},
    {name:'배지 관리하기', href: '/badge', icon:Cog8ToothIcon}
];

export default function BtnNav() { 

    return(
        <>
            <div className="max-w-sm mx-auto flex">
                {links.map((link)=>{
                    const LinkIcon = link.icon;
                    return(
                        <div key={link.name} className="h-16 mx-2 flex flex-col justify-center items-center">
                            <Link
                                href={link.href}
                                className='flex justify-center items-center font-black w-12 h-12 rounded-full bg-slate-100 mb-1'
                            >                                
                                <LinkIcon className="w-8 h-8"></LinkIcon>
                            </Link>
                            <p className="text-xs">{link.name}</p>
                            
                        </div>
                    );
                })}
            </div>
        </>
    );
};


