import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface LoaderStateProps {
  title?: string;
  className?: string;
}

export function LoaderState(props: LoaderStateProps) {
  const { title = "Cargando datos...", className } = props;
  return (
    <main
      className={cn(
        "flex items-center justify-center h-[calc(100vh-8rem)]",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <Spinner className="size-10" />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </main>
  );
}
