import Link from "next/link";
import clsx from 'clsx';
import { ChevronRightIcon } from "@heroicons/react/24/outline";

function Card({content}) {
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

function CardList({name, contents, CustomCard}) {
    const CardComponent = CustomCard ? CustomCard : Card;
    return(
        <div className="flex flex-col">
            {name && (
                <div className="my-1 font-medium text-lg">
                    <p>{name}</p>
                </div>
            )}
            <div className="h-56 overflow-y-scroll p-2 scrollbar-hide">
                {contents.map((content) => (
                    <CardComponent key={content.subject} content={content}></CardComponent>
                ))}
            </div>
        </div>   
    )
};

function LinkCard ({ content }) {
    return (
        <Link
            href={content.href}
            name={content.subject}
            className="flex justify-between border mb-1 p-2 items-center"
        >
            <p className="font-medium text-sm">{content.subject}</p>
            <ChevronRightIcon className="flex-initial w-5 h-5 stroke-slate-600" />
        </Link>
    );
};

export {
    Card,
    CardList,
    LinkCard
}