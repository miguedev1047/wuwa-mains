import {
  combatStyles,
  resonators,
  resonatorLevels,
  resonatorBonus,
  resonatorChainResonance,
  resonatorSkills,
} from "@/services/db/schema/resonator-schema";
import type { InferSelectModel } from "drizzle-orm";

export type ResonatorFullDatabaseSchema = InferSelectModel<
  typeof resonators
> & {
  combat_styles: InferSelectModel<typeof combatStyles>[];
  level: InferSelectModel<typeof resonatorLevels>[];
  bonus: InferSelectModel<typeof resonatorBonus>[];
  resonance_chain: InferSelectModel<typeof resonatorChainResonance>[];
  skills: InferSelectModel<typeof resonatorSkills>[];
};

export type ResonatorDatabaseSchema = InferSelectModel<typeof resonators>;

export type ResonatorCombatStylesDatabaseSchema = InferSelectModel<
  typeof combatStyles
>;

export type ResonatorLevelsDatabaseSchema = InferSelectModel<
  typeof resonatorLevels
>;

export type ResonatorSkillsDatabaseSchema = InferSelectModel<
  typeof resonatorSkills
>;

export type ResonatorBonusDatabaseSchema = InferSelectModel<
  typeof resonatorBonus
>;

export type ResonatorChainResonanceDatabaseSchema = InferSelectModel<
  typeof resonatorChainResonance
>;
