import {
  WEAPON_MAIN_STAT_ENUM,
  WEAPON_TYPE_ENUM,
  STARS_ENUM,
} from "@/constants";
import { z } from "zod";

export const weaponZodSchema = z.object({
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
    .describe("Descripción detallada del arma."),

  passive: z
    .any()
    .refine(
      (val) => typeof val === "object" && val !== null && !Array.isArray(val),
      { error: "La pasiva es requerida." },
    )
    .refine((val) => Object.keys(val ?? {}).length > 0, {
      error: "La pasiva no puede estar vacía.",
    })
    .describe("Pasiva detallada del arma."),

  avatar_image: z
    .url({ error: "La URL del avatar no es válida." })
    .describe("Imagen de retrato del arma."),

  weapon_type: z
    .enum(WEAPON_TYPE_ENUM, {
      error: "El tipo de arma seleccionado no es válido.",
    })
    .describe("Tipo de arma."),

  stars: z
    .enum(STARS_ENUM, {
      error: "La rareza del arma no es válida.",
    })
    .describe("Rareza del arma (número de estrellas)."),

  atq: z
    .number()
    .min(0, { error: "El ataque básico del arma es requerida." })
    .describe("Ataque básico del arma."),

  main_stat: z
    .enum(WEAPON_MAIN_STAT_ENUM, {
      error: "La estadística principal del arma no es válida.",
    })
    .describe("Estadística principal del arma."),

  main_stat_value: z
    .number()
    .min(0, {
      message: "El valor de la estadística principal es requerida.",
    })
    .describe("Valor de la estadística principal del arma."),

  is_visible: z.boolean().describe("Alterna la visibilidad del arma."),

  is_new: z.boolean().describe("Alterna si el arma es nuevo."),

  createdAt: z
    .date()
    .describe("Fecha de creación del registro en milisegundos."),

  updatedAt: z
    .date()
    .describe("Última fecha de actualización en milisegundos."),
});

export type WeaponZodSchema = z.infer<typeof weaponZodSchema>;
