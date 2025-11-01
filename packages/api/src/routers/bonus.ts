import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure } from "../index";
import { idZodSchema, resonatorBonusZodSchema } from "@wuwa-mains/schemas";
import { eq } from "drizzle-orm";
import { resonatorBonus } from "@wuwa-mains/db/root";

export const bonusRouter = {
  update: protectedProcedure
    .input(resonatorBonusZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...bonusData } = input;

        if (!id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Bonus no encontrado.",
          });
        }

        await ctx.db
          .update(resonatorBonus)
          .set(bonusData)
          .where(eq(resonatorBonus.id, id));

        return {
          code: "SUCCESS",
          message: "Bonus actualizado.",
        };
      } catch (error) {
        console.error("Error updating bonus:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al actualizar el bonus del resonador.",
          cause: error,
        });
      }
    }),
  add: protectedProcedure
    .input(resonatorBonusZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { ...resonatorBonusData } = input;

        console.log(`[INPUT]: ${JSON.stringify(resonatorBonusData, null, 2)}`);

        const [result] = await ctx.db
          .insert(resonatorBonus)
          .values(resonatorBonusData)
          .returning();

        console.log(`[RESULT]: ${JSON.stringify(result, null, 2)}`);

        return {
          code: "SUCCESS",
          message: "Bonus agregado.",
        };
      } catch (error) {
        console.error("Error adding bonus:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al agregar el bonus del resonador.",
          cause: error,
        });
      }
    }),
  delete: protectedProcedure
    .input(idZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        await ctx.db.delete(resonatorBonus).where(eq(resonatorBonus.id, id));

        return {
          code: "SUCCESS",
          message: "Bonus eliminado.",
        };
      } catch (error) {
        console.error("Error deleting bonus:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al eliminar el bonus del resonador.",
          cause: error,
        });
      }
    }),
} satisfies TRPCRouterRecord;
