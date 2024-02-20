import Link from "next/link";
import Image from "next/image";
import {
    CheckBadgeIcon
} from '@heroicons/react/24/solid';
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { useAccount, useBalance, useContractRead  } from 'wagmi';
import { NftAddress } from '@/contractInfo/address';
import { Abi } from '@/contractInfo/abi';
import { useAuth } from "@/context/Context";
import { useState } from "react";


export default function Badge({content}) {
    const [isMintedNFT, setIsMintedNFT] = useState(false);
    const isValid = JSON.parse(content?.isValid)
    const isVerified = JSON.parse(content?.isVerified)
    const account = useAccount();

    if(account?.isConnected && isVerified){
        if (content?.tokenId.length !== 0 ) {
            const uintTokenId = BigInt(content?.tokenId)
        
            //ignore problems 
            //React Hook "useContractRead" is called conditionally. React Hooks must be called in the exact same order in every component render.
            const contractRead = useContractRead({
                abi: Abi,
                address: NftAddress,
                functionName: 'ownerOf',
                args: [uintTokenId],
                onSuccess(data) {
                    console.log('Success', data);
                    console.log('Wallet Address', account?.address)

                  },
            });
            if(contractRead?.data === account?.address) {
                setIsMintedNFT(true);
            } 
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
