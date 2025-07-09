// app/actions/todo.ts
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/server/db"; // wherever your Prisma client is
import { auth } from "@/server/auth";

export async function addTodoAction(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Not authenticated");

  const content = formData.get("content")?.toString().trim();
  if (!content) return;

  await db.todo.create({
    data: {
      content,
      done: false,
      //userId: session.user.id, // if you store the user
    },
  });

  revalidatePath("/"); // or wherever the list is rendered
}

export async function deleteTodoAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;

  await db.todo.delete({ where: { id } });
  revalidatePath("/");
}

export async function toggleTodoDoneAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const done = formData.get("done") === "true";
  if (!id) return;

  await db.todo.update({
    where: { id },
    data: { done },
  });

  revalidatePath("/");
}
