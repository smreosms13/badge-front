import { UserCircleIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline"
export default function Table({user}){
    const birthday = new Date(user.birthday);
    const year = birthday.getFullYear();
    const month = birthday.getMonth() +1 ;
    const day = birthday.getDate();

    return(
        <>
        <div className="flex mb-3 flex-col ">
            <div className="">
                <p className="text-sm font-normal text-gray-400">Full Name</p>
                <div className="flex my-1">
                    <UserCircleIcon className="w-5 h-5 stroke-gray-400"></UserCircleIcon>
                    <p className="ms-5 text-sm">{user.name}</p>
                </div>
            </div>
            <div className="my-2">
                <p className="text-sm font-normal text-gray-400">Email Address</p>
                <div className="flex my-1">
                    <EnvelopeIcon className="w-5 h-5 stroke-gray-400"></EnvelopeIcon>
                    <p className="ms-5 text-sm">{user.email}</p>
                </div>
            </div>
            <div className="">
                <p className="text-sm font-normal text-gray-400">Phone Number</p>
                <div className="flex my-1">
                    <PhoneIcon className="w-5 h-5 stroke-gray-400"></PhoneIcon>
                    <p className="ms-5 text-sm">{user.phone}</p>
                </div>
            </div>
            <div className="">
                <p className="text-sm font-normal text-gray-400">Birth Day</p>
                <div className="flex my-1">
                    <div className="flex-grow ms-5 border-b border-slate-200 text-sm text-center">{year}</div>
                    <div className="flex-grow ms-5 border-b border-slate-200 text-sm text-center">{month}</div>
                    <div className="flex-grow ms-5 border-b border-slate-200 text-sm text-center">{day}</div>
                </div>
            </div>
        </div>
    </>
    )
}