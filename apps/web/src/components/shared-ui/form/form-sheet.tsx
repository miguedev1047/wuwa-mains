import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { createContext, use } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";

interface FormSheetContextProps {
  renderHeader?: React.ReactNode;
  renderContent?: React.ReactNode;
  renderFooter?: React.ReactNode;
  isEditing?: boolean;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const FormSheetContext = createContext<FormSheetContextProps | null>(null);

function useFormSheet() {
  const CONTEXT = use(FormSheetContext);
  if (!CONTEXT)
    throw new Error("useFormSheet must wrapped in FormSheetContext");
  return CONTEXT;
}

export function FormSheetRoot(props: FormSheetContextProps) {
  return (
    <FormSheetContext.Provider value={{ ...props }}>
      <FormSheet />
    </FormSheetContext.Provider>
  );
}

export function FormSheet() {
  const { ...data } = useFormSheet();
  return (
    <Sheet open={data.open} onOpenChange={data.onOpenChange}>
      <SheetTrigger asChild>
        <Button size="icon">
          {data.isEditing && <PencilIcon />}
          {!data.isEditing && <PlusIcon />}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[640px]">
        {data.renderHeader}
        <ScrollArea className="h-[720px]">{data.renderContent}</ScrollArea>
        {data.renderFooter}
      </SheetContent>
    </Sheet>
  );
}

export function FormSheetHeader({
  ...props
}: React.ComponentProps<typeof SheetHeader>) {
  return <SheetHeader {...props} />;
}

export function FormSheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetTrigger>) {
  return <SheetTrigger asChild {...props} />;
}

export function FormSheetTitle({
  ...props
}: React.ComponentProps<typeof SheetTitle>) {
  return <SheetTitle {...props} />;
}

export function FormSheetDescription({
  ...props
}: React.ComponentProps<typeof SheetDescription>) {
  return <SheetDescription {...props} />;
}

export function FormSheetContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full grid @[640px]/form:grid-cols-2 gap-4 px-4",
        className,
      )}
      {...props}
    />
  );
}

export function FormSheetFooter({
  children,
  className,
  ...props
}: React.ComponentProps<typeof SheetFooter>) {
  return (
    <SheetFooter className={cn("grid grid-cols-2 gap-2", className)} {...props}>
      <SheetClose asChild>
        <Button variant="outline">Cancelar</Button>
      </SheetClose>
      {children}
    </SheetFooter>
  );
}

export function FormSheetHandle({ ...props }: React.ComponentProps<"form">) {
  return <form {...props} />;
}
