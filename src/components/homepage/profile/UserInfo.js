"use client"
import { UserCircleIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline"
import { useAuth } from "@/context/Context";
import Image from "next/image";

export default function UserInfo({content}){
    const { currentUser } = useAuth()

    const birthday = new Date(content.birthday);
    const year = birthday.getFullYear();
    const month = birthday.getMonth() +1 ;
    const day = birthday.getDate();

    return(
        <>
        <div className="flex items-center flex-col w-full bg-cover">
            <div className="flex h-[87px] w-[87px] items-center justify-center">
                <Image
                className="rounded-full"
                src={currentUser.photoURL}
                alt="USER"
                width={80}
                height={80}
                />
            </div>
            {/* Name and position */}
            <div className="flex flex-col items-center">
                <h4 className="text-navy-700 text-xl font-bold dark:text-white">
                {currentUser.displayName}
                </h4>
                <h5 className="text-base font-normal text-gray-600">{content.subscription}</h5>
            </div>
        </div>
        <div className="flex mb-3 flex-col ">
            <div className="">
                <p className="text-sm font-normal text-gray-400">Full Name</p>
                <div className="flex my-1">
                    <UserCircleIcon className="w-5 h-5 stroke-gray-400"></UserCircleIcon>
                    <p className="ms-5 text-sm">{currentUser.displayName}</p>
                </div>
            </div>
            <div className="my-2">
                <p className="text-sm font-normal text-gray-400">Email Address</p>
                <div className="flex my-1">
                    <EnvelopeIcon className="w-5 h-5 stroke-gray-400"></EnvelopeIcon>
                    <p className="ms-5 text-sm">{currentUser.email}</p>
                </div>
            </div>
            <div className="">
                <p className="text-sm font-normal text-gray-400">Phone Number</p>
                <div className="flex my-1">
                    <PhoneIcon className="w-5 h-5 stroke-gray-400"></PhoneIcon>
                    <p className="ms-5 text-sm">{content.phone}</p>
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