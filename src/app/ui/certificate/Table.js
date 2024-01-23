import { UserCircleIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline"
export default function Table({content}){
      // TODO content의 값을 넣어야 함. 현재 비워둠.
    return(
        <>
        <div className="flex mb-3 flex-col ">
            <div className="">
                <p className="text-sm font-semibold ">Issuer ID</p>
                <div className="flex my-1">
                    <UserCircleIcon className="w-5 h-5 stroke-gray-400"></UserCircleIcon>
                    <p className="ms-5 text-sm"></p>
                </div>
            </div>
            <div className="my-2">
                <p className="text-sm font-semibold ">Issuer Name</p>
                <div className="flex my-1">
                    <EnvelopeIcon className="w-5 h-5 stroke-gray-400"></EnvelopeIcon>
                    <p className="ms-5 text-sm"></p>
                </div>
            </div>
            <div className="">
                <p className="text-sm font-semibold">Email address</p>
                <div className="flex my-1">
                    <PhoneIcon className="w-5 h-5 stroke-gray-400"></PhoneIcon>
                    <p className="ms-5 text-sm"></p>
                </div>
            </div>
            <div className="">
                <p className="text-sm font-semibold ">Artification</p>
                <div className="flex my-1">
                    <PhoneIcon className="w-5 h-5 stroke-gray-400"></PhoneIcon>
                    <p className="ms-5 text-sm"></p>
                </div>
            </div>
        </div>
    </>
    )
}