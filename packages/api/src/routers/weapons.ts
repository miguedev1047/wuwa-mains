import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure, publicProcedure } from "../index";
import { weapons } from "@wuwa-mains/db/schema/weapon-schema";
import { weaponZodSchema } from "@wuwa-mains/schemas/zod/weapon-schema";
import { idZodSchema } from "@wuwa-mains/schemas/zod/id-schema";
import { eq } from "drizzle-orm";

export const weaponsRouter = {
  get: publicProcedure.query(async ({ ctx }) => {
    try {
      const weapons = await ctx.db.query.weapons.findMany();
      return weapons;
    } catch (error) {
      console.error("Error getting weapons:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error al obtener las armas.",
        cause: error,
      });
    }
  }),
  unique: publicProcedure.input(idZodSchema).query(async ({ ctx, input }) => {
    try {
      const { id } = input;

      const weapon = await ctx.db.query.weapons.findFirst({
        where: eq(weapons.id, id),
      });

      if (!weapon) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Arma no encontrada.",
        });
      }

      return weapon;
    } catch (error) {
      console.error("Error getting unique weapon:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error al obtener el arma única.",
        cause: error,
      });
    }
  }),
  update: protectedProcedure
    .input(weaponZodSchema.extend(idZodSchema.shape))
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...weaponData } = input;

        const [result] = await ctx.db
          .update(weapons)
          .set(weaponData)
          .where(eq(weapons.id, id))
          .returning();

        if (!result) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Arma no encontrada.",
          });
        }

        return {
          code: "SUCCESS",
          message: "Arma actualizada.",
          data: result,
        };
      } catch (error) {
        console.error("Error updating weapon:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al actualizar la arma.",
          cause: error,
        });
      }
    }),
  add: protectedProcedure
    .input(weaponZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { ...resonatorData } = input;

        const [result] = await ctx.db
          .insert(weapons)
          .values(resonatorData)
          .returning();

        return {
          code: "SUCCESS",
          message: "Arma agregada.",
          data: result,
        };
      } catch (error) {
        console.error("Error creating weapon:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al crear el arma.",
          cause: error,
        });
      }
    }),
  delete: protectedProcedure
    .input(idZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        await ctx.db.delete(weapons).where(eq(weapons.id, id));
        return {
          code: "SUCCESS",
          message: "Arma eliminada.",
        };
      } catch (error) {
        console.error("Error deleting weapon:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al eliminar el arma.",
          cause: error,
        });
      }
    }),
} satisfies TRPCRouterRecord;
