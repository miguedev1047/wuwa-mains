import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

interface StarsListProps extends React.ComponentProps<"ol"> {
  stars: string;
}

const starsNumber: Record<string, number> = {
  five_stars: 5,
  four_stars: 4,
  three_stars: 3,
  two_stars: 2,
  one_star: 1,
};

export function StarsList({ stars, className }: StarsListProps) {
  const starCount = starsNumber[stars];

  const STAR_LIST = [...Array(starCount)].map((_, index) => (
    <span key={index}>
      <StarIcon className="text-yellow-400 size-8" />
    </span>
  ));

  return (
    <ol className={cn("flex items-center gap-0.5 flex-row", className)}>
      {STAR_LIST}
    </ol>
  );
}
