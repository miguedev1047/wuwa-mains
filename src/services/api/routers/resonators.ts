import {
  resonators,
  combatStyles,
} from "@/services/db/schema/resonator-schema";
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "@/services/api";
import { resonatorZodSchema, idZodSchema } from "@/schemas/zod";
import { combatStylesTransformOpts } from "@/services/api/helpers/option-transform";
import { eq } from "drizzle-orm";

export const resonatorsRouter = {
  get: publicProcedure.query(async ({ ctx }) => {
    try {
      const resonators = await ctx.db.query.resonators.findMany();
      return resonators;
    } catch (error) {
      console.error("Error getting resonators:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error al obtener los resonadores.",
        cause: error,
      });
    }
  }),
  full: publicProcedure.query(async ({ ctx }) => {
    try {
      const resonators = await ctx.db.query.resonators.findMany({
        with: {
          combat_styles: true,
          skills: true,
          bonus: true,
          resonance_chain: true,
          level: true,
        },
      });
      return resonators;
    } catch (error) {
      console.error("Error getting resonators:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error al obtener los resonadores.",
        cause: error,
      });
    }
  }),
  unique: publicProcedure.input(idZodSchema).query(async ({ ctx, input }) => {
    try {
      const { id } = input;

      const resonator = await ctx.db.query.resonators.findFirst({
        where: eq(resonators.id, id),
        with: {
          combat_styles: true,
          skills: true,
          bonus: true,
          resonance_chain: true,
          level: true,
        },
      });

      if (!resonator) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Resonador no encontrado.",
        });
      }

      return resonator;
    } catch (error) {
      console.error("Error getting unique resonator:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error al obtener el resonador único.",
        cause: error,
      });
    }
  }),
  update: protectedProcedure
    .input(resonatorZodSchema.extend(idZodSchema.shape))
    .mutation(async ({ ctx, input }) => {
      try {
        const { combat_styles, id, ...resonatorData } = input;

        const result = await ctx.db.transaction(async (tx) => {
          const [updated] = await tx
            .update(resonators)
            .set(resonatorData)
            .where(eq(resonators.id, id))
            .returning();

          if (!updated) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Resonador no encontrado",
            });
          }

          await tx
            .delete(combatStyles)
            .where(eq(combatStyles.resonator_id, id));

          if (combat_styles?.length) {
            const newStyles = combatStylesTransformOpts({
              combatStyles: combat_styles,
              resonatorId: id,
            });
            await tx.insert(combatStyles).values(newStyles);
          }

          return updated;
        });

        return {
          code: "SUCCESS",
          message: "Resonador actualizado.",
          data: result,
        };
      } catch (error) {
        console.error("Error updating resonator:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al actualizar el resonador.",
          cause: error,
        });
      }
    }),
  add: protectedProcedure
    .input(resonatorZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { combat_styles, ...resonatorData } = input;

        const result = await ctx.db.transaction(async (tx) => {
          const [added] = await tx
            .insert(resonators)
            .values(resonatorData)
            .returning();

          if (!added) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Error al crear el resonador.",
            });
          }

          if (combat_styles.length > 0) {
            const mapCombatStyles = combatStylesTransformOpts({
              combatStyles: combat_styles,
              resonatorId: added.id,
            });
            await tx.insert(combatStyles).values(mapCombatStyles);
          }

          return added;
        });

        return {
          code: "SUCCESS",
          message: "Resonador agregado.",
          data: result,
        };
      } catch (error) {
        console.error("Error creating resonator:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al crear el resonador.",
          cause: error,
        });
      }
    }),
  delete: protectedProcedure
    .input(idZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        await ctx.db.delete(resonators).where(eq(resonators.id, id));

        return {
          code: "SUCCESS",
          message: "Resonador eliminado.",
        };
      } catch (error) {
        console.error("Error deleting resonator:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al eliminar el resonador.",
          cause: error,
        });
      }
    }),
} satisfies TRPCRouterRecord;
