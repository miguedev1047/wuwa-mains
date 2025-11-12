import { weapons, weaponsLevels } from "@/services/db/schema/weapon-schema";
import type { InferSelectModel } from "drizzle-orm";

export type WeaponFullDatabaseSchema = InferSelectModel<typeof weapons> & {
  levels: InferSelectModel<typeof weaponsLevels>[];
};

export type WeaponDatabaseSchema = InferSelectModel<typeof weapons>;

export type WeaponLevelsDatabaseSchema = InferSelectModel<typeof weaponsLevels>;
