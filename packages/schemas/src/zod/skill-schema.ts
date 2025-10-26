import { z } from "zod";
import { SKILL_TYPE_ENUM } from "@wuwa-mains/constants";

export const resonatorSkillZodSchema = z.object({
  name: z
    .string()
    .min(2, { error: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { error: "El nombre no puede superar los 50 caracteres." })
    .describe("Nombre de la habilidad del resonador."),

  skill_image: z
    .url({ error: "La URL de la imagen de la habilidad no es válida." })
    .describe("Imagen representativa de la habilidad."),

  skill_type: z
    .enum(SKILL_TYPE_ENUM, {
      error: "El tipo de habilidad no es válido.",
    })
    .describe("Tipo de habilidad (Básica, Resonancia, Final, etc.)."),

  description: z
    .any()
    .refine(
      (val) => typeof val === "object" && val !== null && !Array.isArray(val),
      { error: "La descripción debe ser un objeto JSON válido." },
    )
    .refine((val) => Object.keys(val ?? {}).length > 0, {
      error: "La descripción no puede estar vacía.",
    })
    .describe("Descripción estructurada de la habilidad en formato JSON."),

  resonator_id: z
    .uuid({ message: "El ID del resonador debe ser un UUID válido." })
    .describe("Identificador del resonador al que pertenece esta habilidad."),

  createdAt: z
    .date()
    .describe("Fecha de creación del registro en milisegundos."),

  updatedAt: z
    .date()
    .describe("Última fecha de actualización del registro en milisegundos."),
});

export type ResonatorSkillZodSchema = z.infer<typeof resonatorSkillZodSchema>;
