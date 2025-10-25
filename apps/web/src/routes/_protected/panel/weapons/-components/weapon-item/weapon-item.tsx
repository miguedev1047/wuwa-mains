import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type WeaponDatabaseSchema } from "@/routes/_protected/panel/weapons/-types";
import { WeaponActions } from "@/routes/_protected/panel/weapons/-components";
import { Link } from "@tanstack/react-router";
import { WeaponIcon } from "@/components/icons-ui/weapon-icon";
import { getStarsLineColor } from "@/utils/get-colors";
import { cn } from "@/lib/utils";

export function WeaponItem(data: WeaponDatabaseSchema) {
  const { avatar_image, name, stars, weapon_type, id } = data;

  const starsColor = getStarsLineColor(stars);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "relative z-10",
            "relative aspect-square bg-card border shadow-sm rounded-(--radius)",
          )}
        >
          <Link
            to={`/panel/weapons/$id`}
            params={{ id }}
            className={cn(
              "after:absolute after:inset-x-0 after:bottom-0 after:h-1",
              starsColor,
            )}
          >
            <figure className="pointer-events-none select-none size-full">
              <img
                loading="lazy"
                className="object-cover size-full "
                src={avatar_image}
                alt={name}
              />
            </figure>
          </Link>
          <WeaponIcon
            weaponType={weapon_type}
            className="size-8 absolute top-1 right-1"
          />
          <WeaponActions {...data} />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
