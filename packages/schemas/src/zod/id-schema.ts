import z from "zod";

export const idZodSchema = z.object({
  id: z.string().min(1, "La id es requerida para realizar esta acción"),
});
