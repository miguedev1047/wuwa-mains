import { Skeleton } from "@/components/ui/skeleton";
import { listGridClass } from "@/tw-class";
import { cn } from "@/lib/utils";

export function ListSkeleton() {
  const MAPPED_SKELETON = [...Array(16)].map((_, index) => (
    <li
      key={index}
      className="*:size-full *:aspect-square *:rounded-(--radius)"
    >
      <Skeleton />
    </li>
  ));

  return <ol className={cn(listGridClass)}>{MAPPED_SKELETON}</ol>;
}

export function InputSkeleton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  return <Skeleton className={cn("w-full h-9", className)} {...props} />;
}
