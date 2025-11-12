import {
  idZodSchema,
  weaponLevelsZodSchema,
  resonatorLevelsZodSchema,
} from "@/schemas/zod";
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure } from "@/services/api";
import { resonatorLevels } from "@/services/db/schema/resonator-schema";
import { weaponsLevels } from "@/services/db/schema/weapon-schema";
import { eq } from "drizzle-orm";

// ========================== RESONATOR LEVELS ==========================

export const resonatorLevelsRouter = {
  update: protectedProcedure
    .input(resonatorLevelsZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...levelsData } = input;

        if (!id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Nivel no encontrado.",
          });
        }

        await ctx.db
          .update(resonatorLevels)
          .set(levelsData)
          .where(eq(resonatorLevels.id, id));

        return {
          code: "SUCCESS",
          message: "Nivel actualizado.",
        };
      } catch (error) {
        console.log("Error updating level:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al actualizar el nivel.",
          cause: error,
        });
      }
    }),
  add: protectedProcedure
    .input(resonatorLevelsZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { ...levelsData } = input;

        await ctx.db.insert(resonatorLevels).values(levelsData);

        return {
          code: "SUCCESS",
          message: "Nivel agregado.",
        };
      } catch (error) {
        console.log("Error adding level:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al agregar el nivel.",
          cause: error,
        });
      }
    }),
  delete: protectedProcedure
    .input(idZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        await ctx.db.delete(resonatorLevels).where(eq(resonatorLevels.id, id));

        return {
          code: "SUCCESS",
          message: "Nivel eliminado.",
        };
      } catch (error) {
        console.log("Error deleting level:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al eliminar el nivel.",
          cause: error,
        });
      }
    }),
} satisfies TRPCRouterRecord;

// ========================== WEAPON LEVELS ==========================

export const weaponLevelsRouter = {
  update: protectedProcedure
    .input(weaponLevelsZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...levelsData } = input;

        if (!id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Nivel no encontrado.",
          });
        }

        await ctx.db
          .update(weaponsLevels)
          .set(levelsData)
          .where(eq(weaponsLevels.id, id));

        return {
          code: "SUCCESS",
          message: "Nivel actualizado.",
        };
      } catch (error) {
        console.log("Error updating level:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al actualizar el nivel.",
          cause: error,
        });
      }
    }),
  add: protectedProcedure
    .input(weaponLevelsZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { ...levelsData } = input;

        await ctx.db.insert(weaponsLevels).values(levelsData);

        return {
          code: "SUCCESS",
          message: "Nivel agregado.",
        };
      } catch (error) {
        console.log("Error adding level:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al agregar el nivel.",
          cause: error,
        });
      }
    }),
  delete: protectedProcedure
    .input(idZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        await ctx.db.delete(weaponsLevels).where(eq(weaponsLevels.id, id));

        return {
          code: "SUCCESS",
          message: "Nivel eliminado.",
        };
      } catch (error) {
        console.log("Error deleting level:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al eliminar el nivel.",
          cause: error,
        });
      }
    }),
} satisfies TRPCRouterRecord;
