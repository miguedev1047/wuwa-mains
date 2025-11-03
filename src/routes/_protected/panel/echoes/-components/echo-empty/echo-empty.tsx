import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PlusIcon, UserIcon } from "lucide-react";

export function EchoEmpty() {
  return (
    <Empty className="w-full border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <UserIcon />
        </EmptyMedia>
        <EmptyTitle>No hay ecos para mostrar</EmptyTitle>
        <EmptyDescription>
          Aún no hay registros en esta lista. Añade un eco y se mostrará aquí.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link to="/panel/echoes/new">
            <PlusIcon />
            Agregar eco
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
