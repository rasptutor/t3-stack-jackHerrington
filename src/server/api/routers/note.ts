import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const noteRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.delete({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({ title: z.string().min(1, "Title is required"), 
        content: z.string().min(1, "Content is required"), 
        topicId: z.string().min(1, "topicId is required") })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.note.create({
        data: {
          title: input.title,
          topicId: input.topicId,
          content: input.content,
        },
      });
    }),

  getAll: protectedProcedure
    .input(z.object({ topicId: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.note.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),
});