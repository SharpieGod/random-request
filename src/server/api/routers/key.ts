import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const keyRouter = createTRPCRouter({
  getKeys: protectedProcedure.query(async ({ ctx, input }) => {
    const keys = await ctx.db.key.findMany({
      where: {
        userId: ctx.user.id,
      },
    });
  }),
});
