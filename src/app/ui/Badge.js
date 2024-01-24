import Link from "next/link";
import Image from "next/image";
import {
    CheckBadgeIcon
} from '@heroicons/react/24/solid';

export default function Badge({content}) {
    const isValid = JSON.parse(content.isValid)
    const isVerified = JSON.parse(content.isVerified)
    return(
        <Link
            href={`/badge/certificate/${content.tokenId}/detail`}
            className="flex flex-col p-1 items-center"
        >
            <div className="flex justify-center items-center relative  rounded-xl">
                <img src={content.image} alt={content.badgeName} className={`w-8 h-8 ${!isValid? 'brightness-[50%]':''}`}></img>
                {isVerified && (
                    <CheckBadgeIcon className="absolute -right-3 -top-1 w-4 h-4 fill-yellow-400"></CheckBadgeIcon>
                )}
            </div>
                
            <div>
                <p className="text-white text-xs font-light text-center">{content.badgeName}</p>
            </div>
        
        </Link>
    );
};
