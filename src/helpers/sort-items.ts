import type { ResonatorSkillZodSchema } from "@/schemas/zod/resonator-schema";
import type { ResonatorLevelsDatabaseSchema } from "@/services/db/types/resonator-types";
import type { WeaponLevelsDatabaseSchema } from "@/services/db/types/weapon-types";

import { ORDER_ROSONATORS_SKILLS } from "@/data/constants";

// -----------------------------------
// Order resonator Skills
// -----------------------------------
//
type SkillTitle = string;
type SkillOrder = number | number[];

interface InherentSkillCounter {
  count: number;
}

const UNDEFINED_ORDER = 999;

export const sortResonatorSkills = (
  skills: ResonatorSkillZodSchema[],
): ResonatorSkillZodSchema[] => {
  const orderMap = new Map<SkillTitle, SkillOrder>();

  ORDER_ROSONATORS_SKILLS.forEach(({ value, order }) => {
    orderMap.set(value, order);
  });

  const inherentSkillCounter: InherentSkillCounter = { count: 0 };

  const sortedSkills = [...skills].sort((a, b) => {
    const orderA = getSkillOrder(a.skill_type, orderMap, inherentSkillCounter);
    const orderB = getSkillOrder(b.skill_type, orderMap, inherentSkillCounter);
    return orderA - orderB;
  });

  return sortedSkills;
};

const getSkillOrder = (
  skillTitle: string,
  orderMap: Map<SkillTitle, SkillOrder>,
  counter: InherentSkillCounter,
): number => {
  const order = orderMap.get(skillTitle);

  if (order === undefined) {
    return UNDEFINED_ORDER;
  }

  if (Array.isArray(order)) {
    const currentOrder = order[counter.count % order.length];
    counter.count++;
    return currentOrder;
  }

  return order;
};

// ============================= SORT RESONATOR LEVES =============================

export const sortResonatorLevels = (
  levels: ResonatorLevelsDatabaseSchema[],
) => {
  return levels.sort((a, b) => {
    const getALevel = parseInt(a.level.split("_")[1]);
    const getBLevel = parseInt(b.level.split("_")[1]);
    return getALevel - getBLevel;
  });
};

// ============================= SORT RESONATOR LEVES =============================

export const sortWeaponLevels = (levels: WeaponLevelsDatabaseSchema[]) => {
  return levels.sort((a, b) => {
    const getALevel = parseInt(a.level.split("_")[1]);
    const getBLevel = parseInt(b.level.split("_")[1]);
    return getALevel - getBLevel;
  });
};
