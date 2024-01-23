import Link from "next/link";
import {
    CheckBadgeIcon
} from '@heroicons/react/24/solid';

export default function Badge({content}) {
    const BadgeIcon = content.icon;
    return(
        <Link
            key={content.name}
            href={content.href}
            className="flex flex-col p-1 items-center"
        >
            <div className="flex justify-center items-center relative  rounded-xl">
                <BadgeIcon className="w-8 h-8 fill-white"></BadgeIcon>
                {content.isVerified && (
                    <CheckBadgeIcon className="absolute -right-3 -top-1 w-4 h-4 fill-yellow-400"></CheckBadgeIcon>
                )}
            </div>
                
            <div>
                <p className="text-white text-xs font-light text-center">{content.subject}</p>
            </div>
        
        </Link>
    );
};
