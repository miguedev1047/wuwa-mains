import SwordIcon from "./assets/sword-icon.png";
import BoardbladeIcon from "./assets/boardblade-icon.png";
import PistolIcon from "./assets/pistol-icon.png";
import RectifierIcon from "./assets/rectifier-icon.png";
import GuantletsIcon from "./assets/guantlets-icon.png";

import { cn } from "@/lib/utils";

const Icons: Record<string, string> = {
  sword: SwordIcon,
  boardblade: BoardbladeIcon,
  pistol: PistolIcon,
  rectifier: RectifierIcon,
  guantlets: GuantletsIcon,
};

interface WeaponIconProps extends React.ComponentProps<"img"> {
  weaponType: string;
}

export function WeaponIcon({ weaponType, className }: WeaponIconProps) {
  const icon = Icons[weaponType];
  if (!icon) return null;

  return (
    <img
      src={icon}
      alt={weaponType}
      loading="lazy"
      className={cn("size-20 pointer-events-none select-none", className)}
    />
  );
}
