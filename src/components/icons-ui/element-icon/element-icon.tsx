import AeroIcon from "./assets/aero-icon.png";
import SpectroIcon from "./assets/spectro-icon.png";
import FusionIcon from "./assets/fusion-icon.png";
import GlacioIcon from "./assets/glacio-icon.png";
import ElectroIcon from "./assets/electro-icon.png";
import HavocIcon from "./assets/havoc-icon.png";

import { cn } from "@/lib/utils";

const Icons: Record<string, string> = {
  aero: AeroIcon,
  spectro: SpectroIcon,
  fusion: FusionIcon,
  glacio: GlacioIcon,
  electro: ElectroIcon,
  havoc: HavocIcon,
};

interface ElementIconProps extends React.ComponentProps<"img"> {
  elementType: string;
}

export function ElementIcon({ elementType, className }: ElementIconProps) {
  const icon = Icons[elementType];
  if (!icon) return null;

  return (
    <img
      src={icon}
      alt={elementType}
      loading="lazy"
      className={cn("size-20 pointer-events-none select-none", className)}
    />
  );
}
