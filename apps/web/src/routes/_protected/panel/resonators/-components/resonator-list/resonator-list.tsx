import {
  ResonatorEmpty,
  ResonatorItem,
} from "@/routes/_protected/panel/resonators/-components";
import { cn } from "@/lib/utils";
import { listGridClass } from "@/tw-class";
import { useResonatorList } from "@/routes/_protected/panel/resonators/-hooks";

export function ResonatorList() {
  const { filteredResonators } = useResonatorList();

  if (!filteredResonators.length) return <ResonatorEmpty />;

  const MAPPED_RESONATORS = filteredResonators.map((resonator) => (
    <li key={resonator.id}>
      <ResonatorItem {...resonator} />
    </li>
  ));

  return <ul className={cn(listGridClass)}>{MAPPED_RESONATORS}</ul>;
}
