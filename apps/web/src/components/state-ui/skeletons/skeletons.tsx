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

export function EditorSkeleton({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  const width = () => `${Math.floor(Math.random() * 240) + 40}%`;

  const MAPPED_SKELETON = [...Array(16)].map((_, index) => (
    <Skeleton
      key={index}
      className="h-4 max-w-[240px]	"
      style={{
        width: width(),
      }}
      {...props}
    />
  ));

  return <ul className="flex flex-wrap gap-1">{MAPPED_SKELETON}</ul>;
}

export function EditorPreviewSkeleton({
  className,
  ...props
}: React.ComponentProps<typeof Skeleton>) {
  const randomWidth = () => `${Math.floor(Math.random() * 60) + 30}%`;

  const paragraphs = [...Array(5)].map((_, i) => (
    <div key={i} className="flex flex-col gap-2">
      {Array.from({ length: 1 }).map((_, j) => (
        <Skeleton
          key={j}
          className="h-4 rounded-md bg-muted/60"
          style={{
            width: j === 0 && Math.random() > 0.6 ? "80%" : randomWidth(),
          }}
          {...props}
        />
      ))}
    </div>
  ));

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-4 rounded-(--radius) border border-border/50 bg-muted/30 animate-in fade-in",
        className,
      )}
    >
      {paragraphs}
    </div>
  );
}
