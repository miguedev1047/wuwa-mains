import { resonators } from "@/services/db/schema/resonator-schema";
import type {
  ResonatorBonusZodSchema,
  ResonatorZodSchema,
} from "@/schemas/zod/resonator-schema";
import type { ResonatorSkillZodSchema } from "@/schemas/zod/resonator-schema";
import type { InferSelectModel } from "drizzle-orm";

export interface ResonatorFormProps {
  data?: ResonatorZodSchema;
  resonatorId?: string;
}

export interface ResonatorSkillFormProps {
  data?: ResonatorSkillZodSchema;
}

export interface ResonatorBonusFormProps {
  data?: ResonatorBonusZodSchema;
}

export type ResonatorDatabaseSchema = InferSelectModel<typeof resonators>;
