import { resonatorSkills } from "@wuwa-mains/db/schema/resonator-schema";
import { TRPCError, type TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure } from "../index";
import { resonatorSkillZodSchema } from "@wuwa-mains/schemas/zod/resonator-schema";
import { idZodSchema } from "@wuwa-mains/schemas/zod/id-schema";
import { eq } from "drizzle-orm";

export const skillsRouter = {
  update: protectedProcedure
    .input(resonatorSkillZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...resonatorSkillData } = input;

        if (!id) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Habilidad del resonador no encontrada.",
          });
        }

        const [result] = await ctx.db
          .update(resonatorSkills)
          .set(resonatorSkillData)
          .where(eq(resonatorSkills.id, id))
          .returning();

        return {
          code: "SUCCESS",
          message: "Habilidad actualizada.",
          data: result,
        };
      } catch (error) {
        console.error("Error updating resonator skill:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Ha ocurrido un error al actualizar la habilidad del resonador.",
          cause: error,
        });
      }
    }),
  add: protectedProcedure
    .input(resonatorSkillZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { ...resonatorSkillData } = input;

        const [result] = await ctx.db
          .insert(resonatorSkills)
          .values(resonatorSkillData)
          .returning();

        return {
          code: "SUCCESS",
          message: "Habilidad agregada.",
          data: result,
        };
      } catch (error) {
        console.error("Error creating resonator:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al agregar la habilidad.",
          cause: error,
        });
      }
    }),
  delete: protectedProcedure
    .input(idZodSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;

        await ctx.db.delete(resonatorSkills).where(eq(resonatorSkills.id, id));

        return {
          code: "SUCCESS",
          message: "Habilidad eliminada.",
        };
      } catch (error) {
        console.error("Error deleting resonator skill:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al eliminar la habilidad.",
          cause: error,
        });
      }
    }),
} satisfies TRPCRouterRecord;
