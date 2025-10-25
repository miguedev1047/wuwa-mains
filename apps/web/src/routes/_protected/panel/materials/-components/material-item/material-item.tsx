import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type MaterialDatabaseSchema } from "@/routes/_protected/panel/materials/-types";
import { MaterialActions } from "@/routes/_protected/panel/materials/-components";
import { Link } from "@tanstack/react-router";
import { getStarsLineColor } from "@/utils/get-colors";
import { cn } from "@/lib/utils";

export function MaterialItem(data: MaterialDatabaseSchema) {
  const { avatar_image, name, stars, id } = data;

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
            to={`/panel/materials/$id`}
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
          <MaterialActions {...data} />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
