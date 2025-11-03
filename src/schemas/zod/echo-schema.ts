import { ECHO_CLASS_ENUM, ECHO_COST_ENUM } from "@/data/constants";
import { optionZodSchema } from "@/schemas/zod";
import z from "zod";

export const echoZodSchema = z.object({
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
    .describe("Descripción detallada del eco."),

  cost: z
    .enum(ECHO_COST_ENUM, {
      error: "El costo seleccionado no es válido.",
    })
    .describe("Costo del eco."),

  class: z
    .enum(ECHO_CLASS_ENUM, {
      error: "La clase seleccionada no es válida.",
    })
    .describe("Clase del eco."),

  sets: z
    .array(optionZodSchema)
    .min(1, { error: "Debe haber al menos un conjunto de eco." })
    .describe("Conjuntos de eco disponibles."),

  avatar_image: z
    .url({ error: "La URL del avatar no es válida." })
    .describe("Imagen de retrato del eco."),

  skill_image: z
    .url({ error: "La URL del avatar no es válida." })
    .describe("Imagen de la skill del eco."),

  createdAt: z
    .date()
    .describe("Fecha de creación del registro en milisegundos."),

  updatedAt: z
    .date()
    .describe("Última fecha de actualización en milisegundos."),
});

export type EchoZodSchema = z.infer<typeof echoZodSchema>;
