import { UserCircleIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline"
export default function Table({content}){
    return(
        <>
        <div className="flex mb-3 flex-col ">
            <div className="">
                <p className="text-sm font-semibold ">Issuer ID</p>
                <div className="flex my-1">
                    <UserCircleIcon className="w-5 h-5 stroke-gray-400"></UserCircleIcon>
                    <p className="ms-5 text-sm">{content.isValid}</p>
                </div>
            </div>
            <div className="">
                <p className="text-sm font-semibold">Issuer Email address</p>
                <div className="flex my-1">
                    <EnvelopeIcon className="w-5 h-5 stroke-gray-400"></EnvelopeIcon>
                    <p className="ms-5 text-sm">{content.isVerified}</p>
                </div>
            </div>
            <div className="my-2">
                <p className="text-sm font-semibold ">Issuer Affiliation</p>
                <div className="flex my-1">
                    <EnvelopeIcon className="w-5 h-5 stroke-gray-400"></EnvelopeIcon>
                    <p className="ms-5 text-sm">{content.proof.creator}</p>
                </div>
            </div>
            <div className="">
                <p className="text-sm font-semibold ">Expiration Date</p>
                <div className="flex my-1">
                    <PhoneIcon className="w-5 h-5 stroke-gray-400"></PhoneIcon>
                    <p className="ms-5 text-sm">{content.proof.created}</p>
                </div>
            </div>
        </div>
    </>
    )
}