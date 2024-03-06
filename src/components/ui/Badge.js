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

// ownerOf(tokenId)로 배지(NFT)의 소유자 address를 조회
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

// 메인 페이지 내 보관함의 배지 component
export default function Badge({content}) {
    // 배지가 NFT인지 저장하는 state
    const [isMintedNFT, setIsMintedNFT] = useState(false);
    // 배지 검증 결과
    const isValid = JSON.parse(content?.isValid)
    const isVerified = JSON.parse(content?.isVerified)
    // user의 wallet 계정
    const account = useAccount();

    // wallet이 연결되었고 배지가 검증되었을 경우
    // tokenId를 통해 user의 wallet에 있는 배지 NFT 소유자가 user 본인인지 확인
    if(account?.isConnected && isVerified){
        if (content?.tokenId.length !== 0 ) {
            ownerBadge(content.tokenId)
                .then(contractRead => {
                    console.log("contractRead", contractRead)
                    // contractRead의 NFT 소유자 address와 현재 user의 wallet address 일치 확인
                    if (contractRead === account?.address) {
                        // set badge as NFT
                        setIsMintedNFT(true);
                        console.log('Owner matched')
                    } else {
                        console.log('Owner not matched');
                    }
                }
            )
        }
    }

    // 배지 렌더링
    return(
        // 배지 상세 페이지로의 링크
        <Link
            href={`/badge/certificate/${content?.id}/detail`}
            className="flex flex-col items-center"
        >
            <div className={`flex justify-center items-center relative w-16 h-20 `}>
                    {/* 배지 이미지와 배지 검증 아이콘 렌더링*/}
                    {content?.image !== "" ? (
                        <>
                            <Image src={content.image} alt={content.badgeName} layout="fill" className=""></Image>
                            {isValid && (
                                <CheckBadgeIcon className={`absolute -right-4 -top-[6px] w-5 h-5 ${isMintedNFT ? 'fill-yellow-400' : 'fill-blue-400'}`}></CheckBadgeIcon>
                            )}
                        </>
                    ) 
                    : (
                        // 배지 이미지 src가 비었다면 icon으로 대체
                        <IdentificationIcon className={`w-12 h-12 fill-white`}></IdentificationIcon>
                    )}

            </div>
                
            <div>
                <p className="text-white text-xs font-light text-center">{content.badgeName}</p>
            </div>
        
        </Link>
    );
};
