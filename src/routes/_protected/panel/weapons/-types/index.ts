import { weapons } from "@/server/db/schema/weapon-schema";
import { type WeaponZodSchema } from "@/schemas/zod/weapon-schema";
import { type InferSelectModel } from "drizzle-orm";

export interface WeaponFormProps {
  data?: WeaponZodSchema;
  weaponId?: string;
}

export type WeaponDatabaseSchema = InferSelectModel<typeof weapons>;
