import { ResonatorItem } from "@panel/resonators/-components/resonator-item";
import { ResonatorEmpty } from "@panel/resonators/-components/resonator-empty";
import { cn } from "@/lib/utils";
import { listGridClass } from "@/tw-class";
import { useResonatorList } from "@panel/resonators/-hooks/use-resonator-list";

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
