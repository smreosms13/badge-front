import Image from "next/image"
import {
  BookmarkSquareIcon, 
  BuildingLibraryIcon, 
  CalendarIcon, 
  ShieldExclamationIcon 
} from "@heroicons/react/24/solid";
import { formatDate } from "@/lib/utils";


// 배지 상세 정보 표시
export default function BadgeDetail({content}){

    // content 속성에서 관련 데이터 추출
    const hasTokenId = content.tokenId;
    const issuanceDate = formatDate(content.issuanceDate);
    const expirationDate = formatDate(content.expirationDate)
  
    // BadgeDetail 컴포넌트 렌더링
    return(
      <>
          <div className="flex items-center flex-col w-full mb-5">
            {/* 배지 이미지 렌더링 */}
            <div className="flex h-32 w-full justify-center">
              <div className="absolute flex h-32 w-32 items-center justify-center">
                <Image
                  className="rounded-3xl border-[5px] border-slate-400"
                  layout="fill"
                  src={content.image}
                  alt={content.badgeName}
                />
              </div>
            </div>
          {/* 배지 이름, 카테고리 및 유형 렌더링 */}
          <div className="mt-3 flex flex-col items-center">
            <h4 className="text-2xl font-bold">
              {content.badgeName}
            </h4>
            <h5 className="text-base font-semibold text-blue-600">{content.dataBadgeClaim.category} 배지 </h5>
            <p className="text-sm text-gray-400">{content.dataBadgeClaim.type} 배지 </p>
          </div>
          {/* tokenId가 존재하는 경우 NFT 상세 정보 링크를 렌더링 */}
          {hasTokenId !== "" && (
            <div className="ml-auto">
              <a 
                href={`https://sepolia.etherscan.io/tx/${content.txHash}`} 
                className="bg-blue-600 rounded-xl p-1 px-2 text-white font-bold"
              >NFT 상세 정보</a>
            </div>
            )
          }
        </div>
        {/* 상세 배지 정보를 렌더링 */}
        <div className="flex-col mx-auto">
            <div className="bg-slate-100 rounded-md p-2">
                <div className="flex">
                        <BookmarkSquareIcon className="w-5 h-5"></BookmarkSquareIcon>
                        <p className="ms-1 text-md font-semibold">배지 정보</p>                    
                </div>
                <p className="ms-1 text-md">{content.dataBadgeClaim.subject}</p>
                <p className="ms-3 text-sm">{content.dataBadgeClaim.description}</p>
                
            </div>
            <div className="my-2 bg-slate-100 rounded-md p-2">
                <div className="flex">
                    <BuildingLibraryIcon className="w-5 h-5 "></BuildingLibraryIcon>
                    <p className="text-md font-semibold ms-1">발급 기관</p>                    
                </div>
                <p className="ms-1 text-md">{content.issuer.affiliation}</p>
            </div>
            <div className="my-2 bg-slate-100 rounded-md p-2">  
                <div className="flex">
                    <CalendarIcon className="w-5 h-5 "></CalendarIcon>
                    <p className="ms-1 text-md font-semibold ">발급 일시</p>
               </div>
               <p className="ms-1 text-md">{issuanceDate}</p>
            </div>
            <div className="my-2 bg-slate-100 rounded-md p-2">
                
                <div className="flex">
                    <ShieldExclamationIcon className="w-5 h-5 "></ShieldExclamationIcon>
                    <p className="ms-1 text-md font-semibold ">유효 기간</p>
                </div>
                <p className="ms-1 text-md">{expirationDate}</p>
            </div>
        </div>
      </>
      
    )
}