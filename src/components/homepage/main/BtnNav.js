'use client';

import Link from "next/link";
import {
    PlusCircleIcon,
    ShareIcon,
    ArchiveBoxIcon,
} from '@heroicons/react/24/outline';

const links = [
    {name:'배지 만들기', href: '/badge/certificate/issue', icon:PlusCircleIcon},
    {name:'배지 공유하기', href: '/badge/certificate/share', icon:ShareIcon},
    {name:'배지 관리하기', href: '/badge/certificate', icon:ArchiveBoxIcon}
];

export default function BtnNav({contents=links}) { 

    return(
        <>
            <div className="max-w-sm mx-auto flex">
                {contents.map((content)=>{
                    const LinkIcon = content.icon;
                    return(
                        <div key={content.name} className="h-16 mx-2 flex flex-col justify-center items-center">
                            <Link
                                href={content.href}
                                className='flex justify-center items-center font-black w-12 h-12 rounded-full bg-slate-100 mb-1'
                            >                                
                                <LinkIcon className="w-8 h-8"></LinkIcon>
                            </Link>
                            <p className="text-xs">{content.name}</p>
                            
                        </div>
                    );
                })}
            </div>
        </>
    );
};


