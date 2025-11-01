import { cn } from "@/lib/utils";
import { statsIcons } from "./icons";

interface StatIconProps extends React.ComponentProps<"img"> {
  stat: string;
}

export function StatIcon({ stat, className, ...props }: StatIconProps) {
  const icon = statsIcons[stat];
  if (!icon) return null;

  return (
    <img
      src={icon}
      alt={stat}
      loading="lazy"
      className={cn("size-5 pointer-events-none select-none", className)}
      {...props}
    />
  );
}
