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
import { BoxIcon, PlusIcon } from "lucide-react";

export function MaterialEmpty() {
  return (
    <Empty className="w-full border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <BoxIcon />
        </EmptyMedia>
        <EmptyTitle>No hay materiales para mostrar</EmptyTitle>
        <EmptyDescription>
          Aún no hay registros en esta lista. Añade un material y se mostrará
          aquí.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link to="/panel/materials/new">
            <PlusIcon />
            Agregar material
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
