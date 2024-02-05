import Link from "next/link";
import {
    CheckBadgeIcon
} from '@heroicons/react/24/solid';
import Image from "next/image";

export default function Badge({content}) {
    const isValid = JSON.parse(content.isValid);
    const isVerified = JSON.parse(content.isVerified);

    return(
        <Link
            href={`/badge/certificate/${content.id}/detail`}
            className="flex flex-col items-center "
        >
            <div className={`flex justify-center items-center relative w-20 h-20 rounded-xl  ${!isValid ? '' : ''}`}>
                <Image src={content.image} alt={content.badgeName} layout="fill" className={`rounded-xl ${!isValid? 'brightness-[70%]':''}`}></Image>
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