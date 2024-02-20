import Link from "next/link";
import Image from "next/image";
import {
    CheckBadgeIcon
} from '@heroicons/react/24/solid';
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { useAccount } from 'wagmi';
import { readContract } from "@wagmi/core";
import { NftAddress } from '@/contractInfo/address';
import { Abi } from '@/contractInfo/abi';
import { useState } from "react";

export async function ownerBadge(tokenId){
    const uintTokenId = BigInt(tokenId)

    try {
        const data = await readContract({
            abi: Abi,
            address: NftAddress,
            functionName: 'ownerOf',
            args: [uintTokenId]
        });
        console.log('Load success:', data);
        return data;
        
    } catch (error) {
        console.error('Error reading contract:', error);
    }  
}

export default function Badge({content}) {
    const [isMintedNFT, setIsMintedNFT] = useState(false);
    const isValid = JSON.parse(content?.isValid)
    const isVerified = JSON.parse(content?.isVerified)
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
            href={`/badge/certificate/${content?.id}/detail`}
            className="flex flex-col p-1 items-center"
        >
            <div className="flex justify-center items-center relative  rounded-xl">
                {content.image !== "" ? (
                        <Image src={content?.image} alt={content.badgeName} width={30} height={35} className={`${!isValid? 'brightness-[70%]':''}`}/>) 
                    : (
                        <IdentificationIcon className={`w-9 h-9 fill-white ${!isValid? 'brightness-[70%]':''}`}></IdentificationIcon>
                    )}
                {isMintedNFT && (
                    <CheckBadgeIcon className="absolute -right-3 -top-1 w-4 h-4 fill-yellow-400"></CheckBadgeIcon>
                )}
            </div>
                
            <div>
                <p className="text-white text-xs font-light text-center">{content.badgeName}</p>
            </div>
        
        </Link>
    );
};
