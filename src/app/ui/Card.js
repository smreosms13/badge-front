import Link from "next/link";
import clsx from 'clsx';

export default function Card({content}) {
    const CardIcon = content.icon
    return(
        <Link 
            href={content.href}
            name={content.subject}
            className="flex border mb-1 p-2 items-center"
        >
            <div className="flex-initial me-5 flex justify-center items-center w-10 h-10 rounded-full bg-slate-100">
                <CardIcon className="w-6 h-6"></CardIcon>
            </div>
            <div className="flex-1">
                <p className="font-medium">{content.subject}</p>
                <p className="text-xs text-slate-300 font-poppins">{content.type}</p>
            </div>
            <div className="flex-initial"><p className={
                clsx('font-medium', {'text-blue-500' : content.achievement===100})
            }>{content.achievement}&nbsp;&#37;</p></div>        
        </Link> 
    );
}