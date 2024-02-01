import Link from "next/link"
export default function BottomButton({name}){
    return(
    <div className="mt-5 w-full flex items-center">
        <Link 
            name={name}
            href='/home'
            className="flex items-center justify-center flex-1 bg-blue-900 rounded-3xl text-white h-12">
            <div>{name}</div>
        </Link>
    </div>
    );
}