// components/AuthRedirector.tsx
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthButton } from "./AuthButton";

export default function AuthRedirector() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/"); // 🔁 client-side redirect
    }
  }, [status, router]);

  return (
    <>
        <div className="flex-1 pl-5 text-3xl font-bold">
            <p>Notes for {session?.user.name}</p>       
        </div>
      
      <div className="flex flex-col items-center justify-center gap-4 mt-4">
        <h1>DashboardPage {session?.user.name}</h1><AuthButton session={session} />
      </div>
    </>
  )
}
