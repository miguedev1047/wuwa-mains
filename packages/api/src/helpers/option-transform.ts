import type { OptionZodSchema } from "@wuwa-mains/schemas/zod/option-schema";

interface combatStylesTransformOptsProps {
  combatStyles: OptionZodSchema[];
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

interface echoSetsTransformOptsProps {
  echoSets: OptionZodSchema[];
  echoId: string;
}

export function echoSetsTransformOpts(props: echoSetsTransformOptsProps) {
  const { echoSets, echoId } = props;
  const mapEchoSets = echoSets.map((item) => ({
    id: crypto.randomUUID(),
    echo_id: echoId,
    label: item.label,
    value: item.value as never,
  }));
  return mapEchoSets;
}
