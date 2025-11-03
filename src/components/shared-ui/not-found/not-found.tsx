import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface NotFoundProps {
  className?: string;
}

export function NotFound({ className }: NotFoundProps) {
  return (
    <main
      className={cn(
        "flex items-center justify-center h-[calc(100vh-8rem)]",
        className,
      )}
    >
      <div className="flex flex-col space-y-4 max-w-md mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-4">
          <FileQuestion className="size-16 text-muted-foreground" />
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">404</h1>
            <h2 className="text-xl font-semibold">Página no encontrada</h2>
            <p className="text-muted-foreground text-sm">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link to="/panel/home">Ir al panel</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}