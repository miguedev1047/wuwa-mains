import { type Option } from "@wuwa-mains/schemas/zod/option-schema";

interface combatStylesTransformOptsProps {
  combatStyles: Option[];
  resonatorId: string;
}

export function combatStylesTransformOpts(
  props: combatStylesTransformOptsProps,
) {
  const { combatStyles, resonatorId } = props;
  const mapCombatStyles = combatStyles.map((item) => ({
    id: crypto.randomUUID(),
    resonator_id: resonatorId,
    label: item.label,
    value: item.value as never,
  }));
  return mapCombatStyles;
}
