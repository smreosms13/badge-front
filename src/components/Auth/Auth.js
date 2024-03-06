'use client'
import { useAuth } from '@/context/Context';
import { useRouter } from 'next/navigation';

// 구글 로그인 페이지
export default function Authentication() {

    const { SignInWithGoogle, currentUser } = useAuth()
    const router = useRouter()

    // 구글 로그인
    async function loginWithGoogle() {
        try {
            await SignInWithGoogle()
            router.replace("/home")
        } catch (error) {
            console.log(error)
        }
    }
    // 로그인 o -> home 페이지로 이동
    if (currentUser) {
        router.push('/home')
    } else {
        // 로그인 x -> 로그인 페이지 렌더링
        return (
            <div className="flex flex-col px-8 pt-10">
                <div className="pt-20 pb-6">
                    <h1 className="text-3xl font-bold tracking-wide leading-loose whitespace-nowrap">
                        Hey, Welcome!
                    </h1>
                    <span className="font-light text-gray-500">
                        Log in now to issue or manage your badges.
                    </span>

                    <div >
                        <div className="pt-8" onClick={() => loginWithGoogle()}>
                            <button
                                className="py-4 px-8 w-full flex items-center justify-center text-white bg-slate-900 rounded-lg shadow-lg hover:bg-slate-800"
                            >
                                <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.3055 10.0415H21.5V10H12.5V14H18.1515C17.327 16.3285 15.1115 18 12.5 18C9.1865 18 6.5 15.3135 6.5 12C6.5 8.6865 9.1865 6 12.5 6C14.0295 6 15.421 6.577 16.4805 7.5195L19.309 4.691C17.523 3.0265 15.134 2 12.5 2C6.9775 2 2.5 6.4775 2.5 12C2.5 17.5225 6.9775 22 12.5 22C18.0225 22 22.5 17.5225 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z" fill="#FFC107" />
                                    <path d="M3.653 7.3455L6.9385 9.755C7.8275 7.554 9.9805 6 12.5 6C14.0295 6 15.421 6.577 16.4805 7.5195L19.309 4.691C17.523 3.0265 15.134 2 12.5 2C8.659 2 5.328 4.1685 3.653 7.3455Z" fill="#FF3D00" />
                                    <path d="M12.5 22C15.083 22 17.43 21.0115 19.2045 19.404L16.1095 16.785C15.0718 17.5742 13.8037 18.001 12.5 18C9.899 18 7.6905 16.3415 6.8585 14.027L3.5975 16.5395C5.2525 19.778 8.6135 22 12.5 22Z" fill="#4CAF50" />
                                    <path d="M22.3055 10.0415H21.5V10H12.5V14H18.1515C17.7571 15.1082 17.0467 16.0766 16.108 16.7855L16.1095 16.7845L19.2045 19.4035C18.9855 19.6025 22.5 17 22.5 12C22.5 11.3295 22.431 10.675 22.3055 10.0415Z" fill="#1976D2" />
                                </svg>
                                <p className="ml-4">  Sign in with google</p>
                            </button>
                        </div>
                    </div>
                    <div className="pt-4">
                        <div
                            className="flex flex-wrap gap-y-2 justify-between items-center pt-14 text-center whitespace-nowrap"
                        >
                            <span className="flex-1 text-gray-500">© 2024 IBEL. All rights reserved.</span>
                            <span className="flex flex-1 justify-center items-center space-x-1">
                                <a href="#" className="text-gray-500 hover:text-gray-600">Terms of Service</a>
                                <span className="text-gray-500">&#183;</span>
                                <a href="#" className="text-gray-500 hover:text-gray-600">Privacy Policy</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}