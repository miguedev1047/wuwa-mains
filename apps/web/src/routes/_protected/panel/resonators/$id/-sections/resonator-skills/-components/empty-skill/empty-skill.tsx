import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { UserIcon } from "lucide-react";

export function EmptySkill() {
  return (
    <Empty className="w-full border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <UserIcon />
        </EmptyMedia>
        <EmptyTitle>No hay habilidades para mostrar</EmptyTitle>
        <EmptyDescription>
          Aún no hay registros en esta lista. Añade una habilidad y se mostrará
          aquí.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
