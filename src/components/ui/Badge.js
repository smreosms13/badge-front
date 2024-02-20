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
            className="flex flex-col items-center"
        >
            <div className={`flex justify-center items-center relative w-16 h-20 `}>
                    {content?.image !== "" ? (
                        <>
                            <Image src={content.image} alt={content.badgeName} layout="fill" className=""></Image>
                            {isValid && (
                                <CheckBadgeIcon className={`absolute -right-4 -top-[6px] w-5 h-5 ${isMintedNFT ? 'fill-yellow-400' : 'fill-blue-400'}`}></CheckBadgeIcon>
                            )}
                        </>
                    ) 
                    : (
                        <IdentificationIcon className={`w-12 h-12 fill-white`}></IdentificationIcon>
                    )}

            </div>
                
            <div>
                <p className="text-white text-xs font-light text-center">{content.badgeName}</p>
            </div>
        
        </Link>
    );
};
