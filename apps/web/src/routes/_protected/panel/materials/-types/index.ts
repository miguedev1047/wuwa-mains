import { materials } from "@wuwa-mains/db/schema/material-schema";
import { type MaterialZodSchema } from "@wuwa-mains/schemas/zod/material-schema";
import { type InferSelectModel } from "drizzle-orm";

export interface MaterialFormProps {
  data?: MaterialZodSchema;
  materialId?: string;
}

export type MaterialDatabaseSchema = InferSelectModel<typeof materials>;
