import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { AuthButton } from "@/components/AuthButton";
import { TodoList } from "./_components/todo";
import { redirect } from "next/navigation";
import ClientHome from "@/components/ClientHome";
import { addTodoAction, deleteTodoAction, toggleTodoDoneAction } from "./actions/todo";
import { db } from "@/server/db";
import RedirectToDashButton from "@/components/RedirectToDashButton";

export default async function Home() { 
  
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();
  
  if (session?.user) {
    //await api.post.getLatest.prefetch();
    //void api.post.getLatest.prefetch();
    //redirect('/pages')
  }  

  return (
    <HydrateClient>
      {/*<ClientHome greeting={hello.greeting} />*/}
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
                {session?.user ? 
                  <TodoForm /> : ""
                }                  
                  <NewTodoList />
              </div>

              <div className="flex flex-col items-center justify-center gap-4 mt-4 mb-4">              
              <AuthButton session={session}/>
              </div>
              <RedirectToDashButton />         
          </div>          
          </div>
      </main>
    </HydrateClient>
    
  );
}

export function TodoForm() {
  return (
    <form action={addTodoAction} className="flex gap-2 mt-4">
      <input
        type="text"
        name="content"
        placeholder="Enter a todo"
        className="rounded px-2 py-1 text-black"
      />
      <button type="submit" className="bg-blue-600 px-3 py-1 rounded text-white">
        Add Todo
      </button>
    </form>
  );
}

export async function NewTodoList() {
  const todos = await db.todo.findMany({ orderBy: { id: "desc" } });

  return (
    <ul className="mt-4 space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center gap-4 justify-between border p-2 rounded"
        >
          {/* Toggle done */}
          <form action={toggleTodoDoneAction}>
            <input type="hidden" name="id" value={todo.id} />
            <input
              type="hidden"
              name="done"
              value={!todo.done ? "true" : "false"}
            />
            <button type="submit" className="cursor-pointer">
              ✅
            </button>
          </form>

          <span
            className={`flex-1 ${
              todo.done ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.content}
          </span>

          {/* Delete */}
          <form action={deleteTodoAction}>
            <input type="hidden" name="id" value={todo.id} />
            <button type="submit" className="text-red-500">
              🗑️
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
