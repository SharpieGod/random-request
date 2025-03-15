import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const keyRouter = createTRPCRouter({
  getKeys: protectedProcedure.query(async ({ ctx, input }) => {
    return await ctx.db.key.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  createKey: protectedProcedure.mutation(async ({ ctx, input }) => {
    const key = await ctx.db.key.create({
      data: {
        userId: ctx.user.id,
        keyType: "RANDOM",
        numberType: "INTEGER",
        lowerBound: 0,
        upperBound: 100,
      },
    });

    return key;
  }),

  updateKey: protectedProcedure
    .input(
      z.object({
        keyId: z.string(),
        keyType: z.enum(["RANDOM", "RANGE"]),
        numberType: z.enum(["INTEGER", "FLOAT"]),
        lowerBound: z.number(),
        upperBound: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const keyCheck = await ctx.db.key.findFirst({
        where: {
          id: input.keyId,
        },
      });

      if (!keyCheck) return null;

      if (keyCheck.userId != ctx.user.id) return null;

      return await ctx.db.key.update({
        data: {
          keyType: input.keyType,
          numberType: input.numberType,
          lowerBound: input.lowerBound,
          upperBound: input.upperBound,
        },
        where: {
          id: input.keyId,
        },
      });
    }),
});
