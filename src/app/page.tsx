import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { AuthButton } from "@/components/AuthButton";
import { TodoList } from "./_components/todo";
import { redirect } from "next/navigation";
import ClientHome from "@/components/ClientHome";

export default async function Home() { 
  
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    //await api.post.getLatest.prefetch();
    void api.post.getLatest.prefetch();
    redirect('/pages')
  }

  return (
    <HydrateClient>
      <ClientHome greeting={hello.greeting} />
    </HydrateClient>
    
  );
}
