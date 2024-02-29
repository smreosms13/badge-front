import {BookmarkSquareIcon, BuildingLibraryIcon, CalendarIcon, ShieldExclamationIcon } from "@heroicons/react/24/solid";

function formatDate(input) {
    let date;
  
    if (typeof input === 'number' && !isNaN(input)) {
      date = new Date(input);
    } else if (typeof input === 'string') {
      date = new Date(input);
    } else {
      return input;
    }
    if (isNaN(date.getTime())) {
        return input; // return 'Invalid date';
      }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export default function Table({content}){

    const issuanceDate = formatDate(content.issuanceDate);
    const expirationDate = formatDate(content.expirationDate)

    return(
        <>
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