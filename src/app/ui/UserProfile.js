import Link from "next/link";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";

const userMock = { name: "Tony Myroniuk", img: "" };

export default function UserProfile({ user = userMock }) {
  return (
    <Link
      href="/user"
      name="profile"
      className="flex border mb-1 p-2 items-center"
    >
      <div className="me-2 flex-initial flex justify-center items-center w-8 h-8 rounded-full bg-slate-100">
        {user.img && (
          <Image
            src={user.img}
            width={50}
            height={50}
            className="w-6 h-6"
          ></Image>
        )}
        <UserIcon></UserIcon>
      </div>
      <div>
        <p className="text-xs text-slate-300 font-poppins">Welcome back</p>
        <p className="font-medium">{user.name}</p>
      </div>
    </Link>
  );
}
