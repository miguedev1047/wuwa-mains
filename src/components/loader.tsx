import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  fullHeight?: boolean;
}

const sizeVariants = {
  sm: "size-4",
  default: "size-6",
  lg: "size-8",
};

export function Loader({
  className,
  size = "default",
  fullHeight = true,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center pt-8",
        fullHeight && "h-full",
        className,
      )}
    >
      <Spinner className={sizeVariants[size]} />
    </div>
  );
}
