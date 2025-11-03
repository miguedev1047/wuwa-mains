import {
  ELEMENT_TYPE_ENUM,
  LEVELS_ENUM,
  RESONATOR_SKILL_TYPE_ENUM,
  STARS_ENUM,
  STATS_TYPE_ENUM,
  WEAPON_TYPE_ENUM,
} from "@/data/constants";
import { z } from "zod";
import { optionZodSchema } from "@/schemas/zod/option-schema";

export const resonatorZodSchema = z.object({
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
      { error: "La descripción es requerida." },
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
    .array(optionZodSchema)
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

export type ResonatorZodSchema = z.infer<typeof resonatorZodSchema>;

export const resonatorSkillZodSchema = z.object({
  id: z.string().optional(),

  name: z
    .string()
    .min(2, { error: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { error: "El nombre no puede superar los 50 caracteres." })
    .describe("Nombre de la habilidad del resonador."),

  skill_image: z
    .url({ error: "La URL de la imagen de la habilidad no es válida." })
    .describe("Imagen representativa de la habilidad."),

  skill_type: z
    .enum(RESONATOR_SKILL_TYPE_ENUM, {
      error: "El tipo de habilidad no es válido.",
    })
    .describe("Tipo de habilidad (Básica, Resonancia, Final, etc.)."),

  description: z
    .any()
    .refine(
      (val) => typeof val === "object" && val !== null && !Array.isArray(val),
      { error: "La descripción es requerida." },
    )
    .refine((val) => Object.keys(val ?? {}).length > 0, {
      error: "La descripción no puede estar vacía.",
    })
    .describe("Descripción detallada de la habilidad."),

  resonator_id: z
    .string()
    .min(1, { error: "El ID del resonador debe ser un UUID válido." })
    .describe("Identificador del resonador al que pertenece esta habilidad."),

  createdAt: z
    .date()
    .describe("Fecha de creación del registro en milisegundos."),

  updatedAt: z
    .date()
    .describe("Última fecha de actualización del registro en milisegundos."),
});

export type ResonatorSkillZodSchema = z.infer<typeof resonatorSkillZodSchema>;

export const resonatorBonusZodSchema = z.object({
  id: z.string().optional(),

  stat_type: z
    .enum(STATS_TYPE_ENUM, {
      error: "El tipo de bono no es válido.",
    })
    .describe("Tipo de bono (Vida, Ataque, Defensa, etc.)."),

  bonus_value: z.number().min(0).describe("Valor del bono."),

  resonator_id: z
    .string()
    .min(1, { error: "El ID del resonador debe ser un UUID válido." })
    .describe("Identificador del resonador al que pertenece este bono."),

  createdAt: z
    .date()
    .describe("Fecha de creación del registro en milisegundos."),

  updatedAt: z
    .date()
    .describe("Última fecha de actualización en milisegundos."),
});

export type ResonatorBonusZodSchema = z.infer<typeof resonatorBonusZodSchema>;

export const chainResonanceZodSchema = z.object({
  id: z.string().optional(),

  name: z
    .string()
    .min(2, { error: "El nombre debe tener al menos 2 caracteres." })
    .max(50, { error: "El nombre no puede superar los 50 caracteres." })
    .describe("Nombre de la cadena de resonancia."),

  chain_resonance_image: z
    .url({
      error: "La URL de la imagen de la cadena de resonancia no es válida.",
    })
    .describe("Imagen representativa de la cadena de resonancia."),

  description: z
    .any()
    .refine(
      (val) => typeof val === "object" && val !== null && !Array.isArray(val),
      { error: "La descripción es requerida." },
    )
    .refine((val) => Object.keys(val ?? {}).length > 0, {
      error: "La descripción no puede estar vacía.",
    })
    .describe("Descripción detallada de la cadena de resonancia."),

  resonator_id: z
    .string()
    .min(1, { error: "El ID del resonador debe ser un UUID válido." })
    .describe(
      "Identificador del resonador al que pertenece esta cadena de resonancia.",
    ),

  createdAt: z
    .date()
    .describe("Fecha de creación del registro en milisegundos."),

  updatedAt: z
    .date()
    .describe("Última fecha de actualización del registro en milisegundos."),
});

export type ChainResonanceZodSchema = z.infer<typeof chainResonanceZodSchema>;

export const levelsZodSchema = z.object({
  id: z.string().optional(),

  level: z
    .enum(LEVELS_ENUM, {
      error: "El tipo de nivel no es válido.",
    })
    .describe("Tipo de nivel (Nivel 10, Nivel 20, etc.)."),

  hp: z
    .number()
    .min(0, { error: "La vida debe ser un número positivo." })
    .describe("Cantidad de vida del nivel."),

  atq: z
    .number()
    .min(0, { error: "El ataque debe ser un número positivo." })
    .describe("Cantidad de ataque del nivel."),

  def: z
    .number()
    .min(0, { error: "La defensa debe ser un número positivo." })
    .describe("Cantidad de defensa del nivel."),

  resonator_id: z
    .string()
    .min(1, { error: "El ID del resonador debe ser un UUID válido." })
    .describe("Identificador del resonador al que pertenece este nivel."),

  createdAt: z
    .date()
    .describe("Fecha de creación del registro en milisegundos."),

  updatedAt: z
    .date()
    .describe("Última fecha de actualización del registro en milisegundos."),
});

export type LevelZodSchema = z.infer<typeof levelsZodSchema>;
