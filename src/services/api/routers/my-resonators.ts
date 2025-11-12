import { TRPCError, TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "@/services/api";
import { myResonators as myResonatorsTable } from "@/services/db/schema/my-resonator-schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { myResonatorZodSchema } from "@/schemas/zod";

export const myResonatorsRouter = {
  get: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const { userId } = input;

        if (!userId) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "No se ha iniciado sesión.",
          });
        }

        const myResonators = await ctx.db.query.myResonators.findMany({
          with: { resonator: true },
          where: eq(myResonatorsTable.user_id, userId),
        });
        return myResonators;
      } catch (error) {
        console.log(`Error getting my resonators: ${error}`);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al obtener tus resonadores.",
        });
      }
    }),
  add: protectedProcedure
    .input(myResonatorZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { ...myResonatorData } = input;

        await ctx.db.insert(myResonatorsTable).values(myResonatorData);

        return {
          code: "SUCCESS",
          message: "Resonador agregado.",
        };
      } catch (error) {
        console.log(`Error adding my resonator: ${error}`);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al agregar tu resonador.",
        });
      }
    }),
} satisfies TRPCRouterRecord;
