import { Skeleton } from "@/components/ui/skeleton";

export function ResonatorListSkeleton() {
  const MAPPED_SKELETON_LIST = [...Array(14)].map((_, index) => (
    <li key={index}>
      <Skeleton className="size-full aspect-2/3 rounded-(--radius)" />
    </li>
  ));

  return (
    <ul className="w-full grid grid-cols-3 md:grid-cols-7 gap-4">
      {MAPPED_SKELETON_LIST}
    </ul>
  );
}
