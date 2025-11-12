import z from "zod";

export const myResonatorZodSchema = z.object({
  id: z.string().optional(),

  resonator_id: z
    .string()
    .min(1, { error: "El ID del resonador debe ser un UUID válido." })
    .describe("Identificador del resonador al que pertenece este nivel."),

  user_id: z
    .string()
    .min(1, { error: "El ID del usuario debe ser un UUID válido." })
    .describe("Identificador del usuario al que pertenece este resonador."),

  createdAt: z
    .date()
    .describe("Fecha de creación del registro en milisegundos."),

  updatedAt: z
    .date()
    .describe("Última fecha de actualización en milisegundos."),
});

export type MyResonatorZodSchema = z.infer<typeof myResonatorZodSchema>;
