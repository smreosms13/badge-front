"use client"
import { useAuth } from "@/context/Context"
import Image from "next/image";

export default function Banner({content}){
    const { currentUser } = useAuth();

    return(
      <div className="flex items-center flex-col w-full bg-cover">
        <div
          className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
          style={{ backgroundImage: `url(https://picsum.photos/400)` }}
          
        >
          <div className="dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
            <Image
              className="rounded-full"
              src={currentUser.photoURL}
              alt="USER"
              width={80}
              height={80}
            />
          </div>
        </div>
      {/* Name and position */}
      <div className="mt-14 flex flex-col items-center">
        <h4 className="text-navy-700 text-xl font-bold dark:text-white">
          {currentUser.displayName}
        </h4>
        <h5 className="text-base font-normal text-gray-600">{content.subscription}</h5>
      </div>
    </div>
    )
}