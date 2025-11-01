import { materials } from "@/server/db/schema/material-schema";
import { type MaterialZodSchema } from "@/schemas/zod/material-schema";
import { type InferSelectModel } from "drizzle-orm";

export interface MaterialFormProps {
  data?: MaterialZodSchema;
  materialId?: string;
}

export type MaterialDatabaseSchema = InferSelectModel<typeof materials>;
