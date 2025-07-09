"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function RedirectToDashButton() {
    const { data: session, status } = useSession();
    const router = useRouter();
      
    const handleClick = () =>{
        router.push("/pages")
    }
    return (
        <div>
            <button 
                onClick={handleClick}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >Go to Dashboard</button>
        </div>
    )
}
