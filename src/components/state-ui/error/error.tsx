import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface ErrorStateProps {
  title?: string;
  className?: string;
}

export function ErrorState(props: ErrorStateProps) {
  const { title = "Ha ocurrido un error. Intentalo mas tarde", className } =
    props;
  return (
    <main
      className={cn(
        "flex items-center justify-center h-[calc(100vh-8rem)]",
        className,
      )}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col items-center text-center gap-4">
          <AlertCircle className="size-10" />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <Button asChild className="w-full">
          <Link to={"/"}>Volver</Link>
        </Button>
      </div>
    </main>
  );
}

export function ErrorItemState(props: ErrorStateProps) {
  const { title = "Ha ocurrido un error. Intentalo mas tarde", className } =
    props;
  return (
    <main
      className={cn(
        "flex items-center justify-center h-[calc(100vh-24rem)]",
        className,
      )}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col items-center text-center gap-4">
          <AlertCircle className="size-10" />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <Button asChild className="w-full">
          <Link to={"/panel/home"}>Volver</Link>
        </Button>
      </div>
    </main>
  );
}
