import { materials } from "@wuwa-mains/db/schema/material-schema";
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../index";
import { idZodSchema } from "@wuwa-mains/schemas";
import { eq } from "drizzle-orm";
import { materialZodSchema } from "@wuwa-mains/schemas/zod/material-schema";

export const materialsRouter = {
  get: publicProcedure.query(async ({ ctx }) => {
    try {
      const materials = await ctx.db.query.materials.findMany();
      return materials;
    } catch (error) {
      console.error("Error getting materials:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error al obtener los materiales.",
        cause: error,
      });
    }
  }),
  unique: publicProcedure.input(idZodSchema).query(async ({ ctx, input }) => {
    try {
      const { id } = input;
      const material = await ctx.db.query.materials.findFirst({
        where: eq(materials.id, id),
      });
      return material;
    } catch (error) {
      console.error("Error getting material:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Ha ocurrido un error al obtener el material.",
        cause: error,
      });
    }
  }),
  update: publicProcedure
    .input(materialZodSchema.extend(idZodSchema.shape))
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...materialData } = input;

        const [result] = await ctx.db
          .update(materials)
          .set(materialData)
          .where(eq(materials.id, id))
          .returning();

        if (!result) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Material no encontrado.",
          });
        }

        return {
          code: "SUCCESS",
          message: "Material actualizado correctamente.",
          data: result,
        };
      } catch (error) {
        console.error("Error updating material:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al actualizar el material.",
          cause: error,
        });
      }
    }),
  add: publicProcedure
    .input(materialZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { ...materialData } = input;

        const [result] = await ctx.db
          .insert(materials)
          .values(materialData)
          .returning();

        return {
          code: "SUCCESS",
          message: "Material agregado correctamente.",
          data: result,
        };
      } catch (error) {
        console.error("Error adding material:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al agregar el material.",
          cause: error,
        });
      }
    }),
  delete: publicProcedure
    .input(idZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        const [result] = await ctx.db
          .delete(materials)
          .where(eq(materials.id, id))
          .returning();

        if (!result) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Material no encontrado.",
          });
        }

        return {
          code: "SUCCESS",
          message: "Material eliminado correctamente.",
          data: result,
        };
      } catch (error) {
        console.error("Error deleting material:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Ha ocurrido un error al eliminar el material.",
          cause: error,
        });
      }
    }),
} satisfies TRPCRouterRecord;
