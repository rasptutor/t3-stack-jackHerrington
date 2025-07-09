"use client"

import { TodoList } from '@/app/_components/todo'
import { HydrateClient } from '@/trpc/server'
import React from 'react'
import { AuthButton } from './AuthButton'
import { useSession } from 'next-auth/react'

export default function ClientHome({ greeting }: { greeting: string }) {
    const { data: session } = useSession();
    return (
        
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
            </h1>
            
            <div className="flex flex-col items-center gap-2">
                <p className="text-2xl text-white">{greeting}</p>
                <div className="text-2xl text-white mt-4">
                <TodoList/>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 mt-4">              
                <AuthButton session={session}/>
                </div>
            </div>          
            </div>
        </main>
        
    )
}
