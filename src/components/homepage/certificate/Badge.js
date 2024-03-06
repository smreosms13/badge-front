import Link from "next/link";
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { ownerBadge } from "@/components/ui/Badge";
import Image from "next/image";
import { useState } from "react";
import { useAccount } from 'wagmi';

export default function Badge({content}) {
// State variable to track whether the badge is minted as an NFT
const [isMintedNFT, setIsMintedNFT] = useState(false);
// Parsing boolean values from content
const isValid = JSON.parse(content.isValid);
const isVerified = JSON.parse(content.isVerified);
const account = useAccount(); // Fetching account information using custom hook

// Checking if the account is connected and badge is verified
if(account?.isConnected && isVerified){
    // Checking if tokenId is not empty
    if (content?.tokenId.length !== 0 ) {
        // Checking ownership of the badge
        ownerBadge(content.tokenId)
            .then(contractRead => {
                console.log("contractRead", contractRead)
                // Checking if the owner matches the account address
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

// Rendering the Badge component
return(
    <Link
        href={`/badge/certificate/${content.id}/detail`}
        className="flex flex-col items-center "
    >
        <div className={`flex justify-center items-center relative w-20 h-20 rounded-xl `}>
                {content?.image !== "" ? (
                    // Rendering badge image if available
                    <>
                        <Image src={content.image} alt={content.badgeName} layout="fill" className="rounded-xl"></Image>
                        {/* Rendering badge status icon */}
                        {isValid && (
                            <CheckBadgeIcon className={`absolute -right-3 -top-1 w-6 h-6  ${isMintedNFT ? 'fill-yellow-400' : 'fill-blue-400'}`}></CheckBadgeIcon>
                        )}
                    </>
                ) 
                // Rendering default icon if image is not available
                : (
                    <IdentificationIcon className={`w-9 h-9 fill-white`}></IdentificationIcon>
                )}

        </div>
        <div>
            {/* Rendering badge name */}
            <p className=" text-sm text-center">{content.badgeName}</p>
        </div>
    </Link>
);
};