import { useGetResonator } from "@/routes/_protected/panel/resonators/$id/-hooks";
import {
  ResonatorBonusEmpty,
  ResonatorBonusItem,
} from "@/routes/_protected/panel/resonators/$id/-sections/resonator-bonus/-components";

export function ResonatorBonusList() {
  const resonator = useGetResonator();
  const bonuses = resonator.bonus;

  if (!bonuses.length) {
    return <ResonatorBonusEmpty />;
  }

  const MAPPED_BONUSES = bonuses.map((bonus) => (
    <ResonatorBonusItem key={bonus.id} {...bonus} />
  ));

  return (
    <div className="flex-1 grid @[640px]:grid-cols-2 gap-4">
      {MAPPED_BONUSES}
    </div>
  );
}
