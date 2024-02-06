import Link from "next/link";
import {
    CheckBadgeIcon
} from '@heroicons/react/24/solid';
import Image from "next/image";

export default function SBadge({content, onClick}) {
    const isValid = JSON.parse(content.isValid);
    const isVerified = JSON.parse(content.isVerified);
  
    return(
      <>            
        <div 
          className={`flex justify-center items-center relative w-20 h-20 rounded-xl  ${!isValid ? '' : ''}`}
          onClick={() => onClick(content.image)} // 클릭 이벤트 핸들러를 설정합니다.
        >
         <Image src={content.image} alt={content.badgeName} width={200} height={200} className={`rounded-xl ${!isValid? 'brightness-[70%]':''}`}></Image>

       
        </div>
        <div>
          <p className=" text-sm text-center">{content.badgeName}</p>
        </div>
      </>
    );
  };
  