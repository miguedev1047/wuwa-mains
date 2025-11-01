import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure } from "../index";
import { chainResonanceZodSchema, idZodSchema } from "@wuwa-mains/schemas";
import { eq } from "drizzle-orm";
import { chainResonance } from "@wuwa-mains/db/schema/resonator-schema";

export const chainResonanceRouter = {
  update: protectedProcedure
    .input(chainResonanceZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...chainResonanceData } = input;

        if (!id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cadena de resonancia no encontrada.",
          });
        }

        await ctx.db
          .update(chainResonance)
          .set(chainResonanceData)
          .where(eq(chainResonance.id, id));

        return {
          code: "SUCCESS",
          message: "Cadena de resonancia actualizada.",
        };
      } catch (error) {
        console.error("Error updating chain resonance:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Ha ocurrido un error al actualizar la cadena de resonancia.",
          cause: error,
        });
      }
    }),
  add: protectedProcedure
    .input(chainResonanceZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { ...chainResonanceData } = input;

        await ctx.db.insert(chainResonance).values(chainResonanceData);

        return {
          code: "SUCCESS",
          message: "Cadena de resonancia agregada.",
        };
      } catch (error) {
        console.error("Error adding chain resonance:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al agregar la cadena de resonancia.",
          cause: error,
        });
      }
    }),
  delete: protectedProcedure
    .input(idZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        await ctx.db.delete(chainResonance).where(eq(chainResonance.id, id));

        return {
          code: "SUCCESS",
          message: "Cadena de resonancia eliminada.",
        };
      } catch (error) {
        console.error("Error deleting chain resonance:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al eliminar la cadena de resonancia.",
          cause: error,
        });
      }
    }),
} satisfies TRPCRouterRecord;
