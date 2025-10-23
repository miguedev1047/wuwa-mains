import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const squareBoxVariants = cva(
  "bg-accent rounded-(--radius) border p-0.5 relative overflow-hidden",
  {
    variants: {
      size: {
        default: "size-20",
        sm: "size-16",
        lg: "size-24",
        xl: "size-32",
        full: "size-full",
      },
      defaultVariants: {
        size: "default",
      },
    },
  },
);

export const SquareBox = ({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof squareBoxVariants>) => {
  return (
    <div
      className={cn(
        squareBoxVariants({ size }),
        "[&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>img]:select-none [&>img]:pointer-events-none",
        className,
      )}
      {...props}
    />
  );
};
