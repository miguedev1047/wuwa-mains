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
import { PlusIcon, SwordIcon } from "lucide-react";

export function WeaponEmpty() {
  return (
    <Empty className="w-full border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <SwordIcon />
        </EmptyMedia>
        <EmptyTitle>No hay armas para mostrar</EmptyTitle>
        <EmptyDescription>
          Aún no hay registros en esta lista. Añade una arma y se mostrará aquí.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link to="/panel/weapons/new">
            <PlusIcon />
            Agregar arma
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
