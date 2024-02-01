import { UserCircleIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline"

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
        <div className="flex mb-3 flex-col ">
            <div className="">
                <p className="text-sm font-semibold">Issuer Email address</p>
                <div className="flex my-1">
                    <EnvelopeIcon className="w-5 h-5 stroke-gray-400"></EnvelopeIcon>
                    <p className="ms-5 text-sm">{content.issuer.emailAddress}</p>
                </div>
            </div>
            <div className="my-2">
                <p className="text-sm font-semibold ">Issuer Affiliation</p>
                <div className="flex my-1">
                    <EnvelopeIcon className="w-5 h-5 stroke-gray-400"></EnvelopeIcon>
                    <p className="ms-5 text-sm">{content.issuer.affiliation}</p>
                </div>
            </div>
            <div className="">
                <p className="text-sm font-semibold ">Issuerance Date</p>
                <div className="flex my-1">
                    <UserCircleIcon className="w-5 h-5 stroke-gray-400"></UserCircleIcon>
                    <p className="ms-5 text-sm">{issuanceDate}</p>
                </div>
            </div>
            <div className="">
                <p className="text-sm font-semibold ">Expiration Date</p>
                <div className="flex my-1">
                    <PhoneIcon className="w-5 h-5 stroke-gray-400"></PhoneIcon>
                    <p className="ms-5 text-sm">{expirationDate}</p>
                </div>
            </div>
        </div>
    </>
    )
}