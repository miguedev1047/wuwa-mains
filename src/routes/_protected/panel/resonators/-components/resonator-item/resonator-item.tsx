import { type ResonatorDatabaseSchema } from "@panel/resonators/-types";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ResonatorActions } from "@panel/resonators/-components/resonator-actions";
import { Link } from "@tanstack/react-router";
import { ElementIcon } from "@/components/icons-ui/element-icon";
import { getStarsLineColor } from "@/utils/get-colors";
import { cn } from "@/lib/utils";

export function ResonatorItem(data: ResonatorDatabaseSchema) {
  const { avatar_image, name, stars, element_type, id } = data;

  const starsColor = getStarsLineColor(stars);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "relative z-10",
            "relative aspect-square bg-card border shadow-lg rounded-(--radius) overflow-hidden",
          )}
        >
          <Link
            to={`/panel/resonators/$id`}
            params={{ id }}
            preload="intent"
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
          <ElementIcon
            elementType={element_type}
            className="size-8 absolute top-1 right-1"
          />
          <ResonatorActions {...data} />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
