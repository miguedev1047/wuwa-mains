import { WeaponItem } from "@panel/weapons/-components/weapon-item";
import { WeaponEmpty } from "@panel/weapons/-components/weapon-empty";
import { cn } from "@/lib/utils";
import { listGridClass } from "@/tw-class";
import { useWeaponList } from "@panel/weapons/-hooks/use-weapon-list";

export function WeaponList() {
  const { filteredWeapons } = useWeaponList();

  if (!filteredWeapons.length) {
    return <WeaponEmpty />;
  }

  const MAPPED_WEAPONS = filteredWeapons.map((weapon) => (
    <li key={weapon.id}>
      <WeaponItem {...weapon} />
    </li>
  ));

  return <ul className={cn(listGridClass)}>{MAPPED_WEAPONS}</ul>;
}
