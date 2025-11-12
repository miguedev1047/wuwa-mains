import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const squareBoxVariants = cva(
  "bg-accent-foreground dark:bg-accent rounded-(--radius) border p-0.5 relative overflow-hidden",
  {
    variants: {
      size: {
        default: "size-20",
        xs: "size-12",
        sm: "size-16",
        lg: "size-24",
        xl: "size-32",
        "2xl": "size-40",
        "3xl": "size-48",
        full: "size-full aspect-square",
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
