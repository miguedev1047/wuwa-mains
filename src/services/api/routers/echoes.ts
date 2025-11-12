import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "@/services/api";
import { idZodSchema, echoZodSchema } from "@/schemas/zod";
import { echoes, echoesSet } from "@/services/db/schema/echo-schema";
import { echoSetsTransformOpts } from "@/services/api/helpers/option-transform";
import { MIN_LENGTH } from "@/data/constants";
import { eq } from "drizzle-orm";

export const echoesRouter = {
  get: publicProcedure.query(async ({ ctx }) => {
    try {
      const echoes = await ctx.db.query.echoes.findMany({
        with: { sets: true },
      });
      return echoes;
    } catch (error) {
      console.error("Error getting echoes:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error al obtener los ecos.",
        cause: error,
      });
    }
  }),
  full: publicProcedure.query(async ({ ctx }) => {
    try {
      const echoes = await ctx.db.query.echoes.findMany({
        with: { sets: true },
      });
      return echoes;
    } catch (error) {
      console.error("Error getting echoes:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error al obtener los ecos.",
        cause: error,
      });
    }
  }),
  unique: publicProcedure.input(idZodSchema).query(async ({ ctx, input }) => {
    try {
      const { id } = input;

      const echo = await ctx.db.query.echoes.findFirst({
        where: eq(echoes.id, id),
        with: { sets: true },
      });

      if (!echo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Eco no encontrado.",
        });
      }

      return echo;
    } catch (error) {
      console.error("Error getting echo:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error al obtener el eco.",
        cause: error,
      });
    }
  }),
  update: protectedProcedure
    .input(echoZodSchema.extend(idZodSchema.shape))
    .mutation(async ({ ctx, input }) => {
      try {
        const { sets, id, ...echoData } = input;

        const result = await ctx.db.transaction(async (tx) => {
          const [updated] = await tx
            .update(echoes)
            .set(echoData)
            .where(eq(echoes.id, id))
            .returning();

          if (!updated) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Eco no encontrado",
            });
          }

          await tx.delete(echoesSet).where(eq(echoesSet.echo_id, id));

          if (sets.length > MIN_LENGTH) {
            const newStyles = echoSetsTransformOpts({
              echoSets: sets,
              echoId: id,
            });
            await tx.insert(echoesSet).values(newStyles);
          }

          return updated;
        });

        return {
          code: "SUCCESS",
          message: "Eco actualizado.",
          data: result,
        };
      } catch (error) {
        console.error("Error updating echo:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al actualizar el eco.",
          cause: error,
        });
      }
    }),
  add: protectedProcedure
    .input(echoZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { sets, ...echoData } = input;

        const result = await ctx.db.transaction(async (tx) => {
          const [added] = await tx.insert(echoes).values(echoData).returning();

          if (!added) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Error al crear el eco.",
            });
          }

          if (sets.length > 0) {
            const newStyles = echoSetsTransformOpts({
              echoSets: sets,
              echoId: added.id,
            });
            await tx.insert(echoesSet).values(newStyles);
          }

          return added;
        });

        return {
          code: "SUCCESS",
          message: "Eco agregado.",
          data: result,
        };
      } catch (error) {
        console.error("Error creating echo:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al crear el eco.",
          cause: error,
        });
      }
    }),
  delete: protectedProcedure
    .input(idZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        await ctx.db.delete(echoes).where(eq(echoes.id, id));

        return {
          code: "SUCCESS",
          message: "Eco eliminado.",
        };
      } catch (error) {
        console.error("Error deleting echo:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al eliminar el eco.",
          cause: error,
        });
      }
    }),
} satisfies TRPCRouterRecord;
