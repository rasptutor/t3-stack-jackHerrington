import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { AuthButton } from "@/components/AuthButton";
import { TodoList } from "./_components/todo";
import { redirect } from "next/navigation";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
    redirect('/pages')
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
            <div className="text-2xl text-white mt-4">
              <TodoList/>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 mt-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <AuthButton session={session}/>
            </div>
          </div>

          {/*session?.user && <LatestPost />*/}
        </div>
      </main>
    </HydrateClient>
  );
}
