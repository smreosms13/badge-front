import Image from "next/image"

// 배지 상세 정보 표시
export default function Banner({content}){

    const hasTokenId = content.tokenId;
  
    return(
      <div className="flex items-center flex-col w-full mb-5">
        {/* badge Image*/}
        <div
          className="flex h-32 w-full justify-center"
        >
          <div className="absolute flex h-32 w-32 items-center justify-center">
            <Image
              className="rounded-3xl border-[5px] border-slate-400"
              layout="fill"
              src={content.image}
              alt={content.badgeName}
            />
          </div>
        </div>
      {/* badgeName, category, badgeType*/}
      <div className="mt-3 flex flex-col items-center">
        <h4 className="text-2xl font-bold">
          {content.badgeName}
        </h4>
        <h5 className="text-base font-semibold text-blue-600">{content.dataBadgeClaim.category} 배지 </h5>
        <p className="text-sm text-gray-400">{content.dataBadgeClaim.type} 배지 </p>
      </div>
      {/* connect to etherscan using txHash */}
      {hasTokenId !== "" && (
        <div className="ml-auto">
          <a 
            href={`https://sepolia.etherscan.io/tx/${content.txHash}`} 
            className="bg-blue-600 rounded-xl p-1 px-2 text-white font-bold"
          >NFT Detail</a>
        </div>
        )
      }
    </div>
    )
}