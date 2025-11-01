import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type EchoesDatabaseSchema } from "@/routes/_protected/panel/echoes/-types";
import { EchoActions } from "@/routes/_protected/panel/echoes/-components";
import { Link } from "@tanstack/react-router";
import { getStarsLineColor } from "@/utils/get-colors";
import { cn } from "@/lib/utils";

export function EchoItem(data: EchoesDatabaseSchema) {
  const { avatar_image, name, id } = data;

  const starsColor = getStarsLineColor("default");

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
            to={`/panel/echoes/$id`}
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
          <EchoActions {...data} />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
