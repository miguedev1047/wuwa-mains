import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { SquareBox } from "@/components/shared-ui/square-box";
import { Button } from "@/components/ui/button";
import { useId, Fragment } from "react";

export function EditableBlock({
  title,
  description,
  addItem,
  children,
}: {
  title: string;
  description?: string;
  addItem?: React.ReactNode;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <section id={`section-${id}`}>
      <Card>
        <CardHeader className="gap-0">
          <div className="flex flex-1 justify-between items-center">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold">{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {addItem && addItem}
          </div>
        </CardHeader>
        <Separator />
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}

export function EditableBlockList<T>({
  items = [],
  children,
  getKey,
  emptyContent,
  className,
  ...props
}: Omit<React.ComponentProps<"ul">, "children"> & {
  items?: T[];
  emptyContent?: React.ReactNode;
  children: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
}) {
  if (!items.length)
    return emptyContent ? (
      emptyContent
    ) : (
      <p className="text-center py-10">No items found</p>
    );

  return (
    <ul className={cn("grid gap-4", className)} {...props}>
      {items.map((item, index) => (
        <Fragment key={getKey ? getKey(item, index) : index}>
          {children(item, index)}
        </Fragment>
      ))}
    </ul>
  );
}

export function EditableBlockEmpty({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";
  return <Comp className={cn("flex flex-1", className)} {...props} />;
}

export function EditableBlockItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn("bg-input/30", className)} {...props}>
      {children}
    </Card>
  );
}

export function EditableBlockMedia({
  className,
  ...props
}: React.ComponentProps<typeof SquareBox>) {
  return <SquareBox size="sm" className={cn("", className)} {...props} />;
}

export function EditableBlockGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-1 items-center gap-4 px-6", className)}
      {...props}
    />
  );
}

export function EditableBlockHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("space-y-1", className)} {...props} />;
}

export function EditableBlockTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-xl font-bold", className)} {...props} />;
}

export function EditableBlockDescription({
  className,
  ...props
}: React.ComponentProps<"h4">) {
  return (
    <h4 className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
}

export function EditableBlockActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-1 gap-2 items-center justify-end", className)}
      {...props}
    />
  );
}
export function EditableBlockBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-1 px-6", className)} {...props} />;
}

export function EditableBlockActionItem({
  className,
  destructive = false,
  asChild = false,
  ...props
}: React.ComponentProps<typeof Button> & {
  destructive?: boolean;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : Button;
  return <Comp variant={destructive ? "destructive" : "default"} {...props} />;
}
