import Link from "next/link";
import {
    CheckBadgeIcon
} from '@heroicons/react/24/solid';

export default function Badge({content}) {
    const isVerified = JSON.parse(content.isValid)

    return(
        <Link
            href={`/badge/certificate/${content.tokenId}/detail`}
            className="flex flex-col items-center "
        >
            <div className="flex justify-center items-center relative w-20 h-20 rounded-xl border">
                <img src={content.image} className="w-14 h-14 bg-blue-900 fill-white"></img>
                {isVerified && (
                    <CheckBadgeIcon className="absolute -right-3 -top-1 w-6 h-6 fill-yellow-400"></CheckBadgeIcon>
                )}
            </div>
            <div>
                <p className=" text-sm text-center">{content.badgeName}</p>
            </div>
            
        
        </Link>
    );
};