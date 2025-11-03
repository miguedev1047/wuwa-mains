import { type ResonatorSkillZodSchema } from "@/schemas/zod/resonator-schema";
import { ORDER_ROSONATORS_SKILLS } from "@/data/constants";

type SkillTitle = string;
type SkillOrder = number | number[];

interface InherentSkillCounter {
  count: number;
}

const UNDEFINED_ORDER = 999;

export const sortSkillsByOrder = (
  skills: ResonatorSkillZodSchema[],
): ResonatorSkillZodSchema[] => {
  const orderMap = new Map<SkillTitle, SkillOrder>();

  ORDER_ROSONATORS_SKILLS.forEach(({ value, order }) => {
    orderMap.set(value, order);
  });

  const inherentSkillCounter: InherentSkillCounter = { count: 0 };

  return [...skills].sort((a, b) => {
    const orderA = getSkillOrder(a.skill_type, orderMap, inherentSkillCounter);
    const orderB = getSkillOrder(b.skill_type, orderMap, inherentSkillCounter);
    return orderA - orderB;
  });
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
