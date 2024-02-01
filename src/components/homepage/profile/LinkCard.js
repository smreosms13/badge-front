import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function LinkCard({content}){
    return(
        <Link
            href={content.href}
            name={content.subject}
            className="flex justify-between border mb-1 p-2 items-center"
        >
            <p className="font-medium text-sm">{content.subject}</p>
            <ChevronRightIcon className="flex-initial w-5 h-5 stroke-slate-600"></ChevronRightIcon> 
        </Link>
    )
}