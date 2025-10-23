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

export function ResonatorEmpty() {
  return (
    <Empty className="w-full border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <UserIcon />
        </EmptyMedia>
        <EmptyTitle>No hay resonadores para mostar</EmptyTitle>
        <EmptyDescription>
          Aún no hay registros en esta lista. Añade un resonador y se mostrará
          aquí.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button asChild>
          <Link to="/panel/resonators/new">
            <PlusIcon />
            Agregar resonador
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
