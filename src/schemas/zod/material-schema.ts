import { MATERIAL_TYPE_ENUM, STARS_ENUM } from "@/data/constants";
import z from "zod";

export const materialZodSchema = z.object({
  name: z
    .string()
    .min(2, { error: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { error: "El nombre no puede superar los 50 caracteres." }),

  description: z
    .any()
    .refine(
      (val) => typeof val === "object" && val !== null && !Array.isArray(val),
      { error: "La descripción es requerida." },
    )
    .refine((val) => Object.keys(val ?? {}).length > 0, {
      error: "La descripción no puede estar vacía.",
    })
    .describe("Descripción detallada del material."),

  material_type: z
    .enum(MATERIAL_TYPE_ENUM, {
      error: "El tipo de material no es válido.",
    })
    .describe(
      "Tipo de material (Material de ascension, Material de mejora de arma, etc.).",
    ),

  stars: z
    .enum(STARS_ENUM, {
      error: "La rareza del arma no es válida.",
    })
    .describe("Rareza del arma (número de estrellas)."),

  avatar_image: z
    .url({ error: "La URL del avatar no es válida." })
    .describe("Imagen de retrato del material."),

  createdAt: z
    .date()
    .describe("Fecha de creación del registro en milisegundos."),

  updatedAt: z
    .date()
    .describe("Última fecha de actualización en milisegundos."),
});

export type MaterialZodSchema = z.infer<typeof materialZodSchema>;
