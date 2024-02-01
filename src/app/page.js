'use client'
import Authentication from '@/components/Auth/Auth';


export default function Page(){
    return(
        <main className='mx-auto max-w-sm h-dvh grid gap-3 shadow-2xl p-6 bg-white'>
            <Authentication/> 
        </main> 
    )
}