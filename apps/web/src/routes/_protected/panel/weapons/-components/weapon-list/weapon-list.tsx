import {
  WeaponEmpty,
  WeaponItem,
} from "@/routes/_protected/panel/weapons/-components";
import { cn } from "@/lib/utils";
import { listGridClass } from "@/tw-class";
import { useWeaponList } from "@/routes/_protected/panel/weapons/-hooks";
import { TooltipProvider } from "@/components/ui/tooltip";

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

  return (
    <TooltipProvider>
      <ul className={cn(listGridClass)}>{MAPPED_WEAPONS}</ul>
    </TooltipProvider>
  );
}
