import {db} from '@/server/db'
import { z } from "zod";

import {
  createTRPCRouter,  
  publicProcedure,
} from "@/server/api/trpc";

export const todoRouter = createTRPCRouter({
    getTodos: publicProcedure.query(async () => { 
        return await db.todo.findMany();
    }),
    addTodo: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.todo.create({ data: { content: input } });
    return true;
   }),
   setDone: publicProcedure
    .input(z.object({ id: z.number(), done: z.boolean() }))
    .mutation(async ({ input: { id, done } }) => {
      await db.todo.update({
        where: { id },
        data: { done },
      });
      return true;
    }),
    deleteTodo: publicProcedure
    .input(z.number()) // just the ID of the todo
    .mutation(async ({ input: id }) => {
      await db.todo.delete({
        where: { id },
      });
      return true;
    }),
});

export type AppRouter = typeof todoRouter;