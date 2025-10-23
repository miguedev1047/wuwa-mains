import z from "zod";

export const optionZodSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type OptionZodSchema = z.infer<typeof optionZodSchema>;
