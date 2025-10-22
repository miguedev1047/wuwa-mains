import {
  ELEMENT_TYPE_ENUM,
  STARS_ENUM,
  WEAPON_TYPE_ENUM,
} from "@wuwa-mains/constants";
import { z } from "zod";
import { optionSchema } from "../zod/option-schema";

export const resonatorSchema = z.object({
  name: z
    .string()
    .min(2, { error: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { error: "El nombre no puede superar los 50 caracteres." }),

  title: z
    .string()
    .min(2, { error: "El título debe tener al menos 2 caracteres." })
    .max(60, { error: "El título no puede superar los 60 caracteres." }),

  description: z
    .any()
    .refine(
      (val) => typeof val === "object" && val !== null && !Array.isArray(val),
      { error: "La descripción debe ser un objeto JSON válido." },
    )
    .refine((val) => Object.keys(val ?? {}).length > 0, {
      error: "La descripción no puede estar vacía.",
    })
    .describe("Descripción detallada del resonador."),

  weapon_type: z
    .enum(WEAPON_TYPE_ENUM, {
      error: "El tipo de arma seleccionado no es válido.",
    })
    .describe("Tipo de arma que utiliza el resonador."),

  element_type: z
    .enum(ELEMENT_TYPE_ENUM, {
      error: "El tipo de elemento seleccionado no es válido.",
    })
    .describe("Elemento con el que resuena el personaje."),

  stars: z
    .enum(STARS_ENUM, {
      error: "La rareza del resonador no es válida.",
    })
    .describe("Rareza del resonador (número de estrellas)."),

  avatar_image: z
    .url({ error: "La URL del avatar no es válida." })
    .describe("Imagen de retrato del resonador."),

  splash_image: z
    .url({ error: "La URL de la imagen principal no es válida." })
    .describe("Ilustración completa del resonador."),

  is_visible: z.boolean().describe("Alterna la visibilidad del resonador."),

  is_new: z.boolean().describe("Alterna si el resonador es nuevo."),

  combat_styles: z
    .array(optionSchema)
    .min(1, {
      error: "Agrega al menos 1 estilo de combate para este resonador",
    })
    .describe("Estilos de combate del resonador."),

  createdAt: z
    .date()
    .describe("Fecha de creación del registro en milisegundos."),

  updatedAt: z
    .date()
    .describe("Última fecha de actualización en milisegundos."),
});

export type ResonatorSchema = z.infer<typeof resonatorSchema>;
