import Link from "next/link";
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { ownerBadge } from "@/components/ui/Badge";
import Image from "next/image";
import { useState } from "react";
import { useAccount } from 'wagmi';

export default function Badge({content}) {
    const [isMintedNFT, setIsMintedNFT] = useState(false);
    const isValid = JSON.parse(content.isValid);
    const isVerified = JSON.parse(content.isVerified);
    const account = useAccount();

    if(account?.isConnected && isVerified){
        if (content?.tokenId.length !== 0 ) {
            ownerBadge(content.tokenId)
                .then(contractRead => {
                    console.log("contractRead", contractRead)
                    if (contractRead === account?.address) {
                        setIsMintedNFT(true);
                        console.log('Owner matched')
                    } else {
                        console.log('Owner not matched');
                    }
                }
            )
        }
    }

    return(
        <Link
            href={`/badge/certificate/${content.id}/detail`}
            className="flex flex-col items-center "
        >
            <div className={`flex justify-center items-center relative w-20 h-20 rounded-xl  ${!isValid ? '' : ''}`}>
                    {content?.image !== "" ? (
                        <>
                            <Image src={content.image} alt={content.badgeName} layout="fill" className={`rounded-xl ${!isValid? 'brightness-[70%]':''}`}></Image>
                            {isMintedNFT && (
                                <CheckBadgeIcon className="absolute -right-3 -top-1 w-6 h-6 fill-yellow-400"></CheckBadgeIcon>
                            )}
                        </>
                    ) 
                    : (
                        <IdentificationIcon className={`w-9 h-9 fill-white ${!isValid? 'brightness-[70%]':''}`}></IdentificationIcon>
                    )}

            </div>
            <div>
                <p className=" text-sm text-center">{content.badgeName}</p>
            </div>
            
        
        </Link>
    );
};