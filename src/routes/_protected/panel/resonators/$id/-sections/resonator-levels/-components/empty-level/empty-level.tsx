import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { LayersIcon } from "lucide-react";

export function EmptyLevel() {
  return (
    <Empty className="w-full border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <LayersIcon />
        </EmptyMedia>
        <EmptyTitle>No hay niveles para mostrar</EmptyTitle>
        <EmptyDescription>
          Aún no hay registros en esta lista. Añade un nivel y se mostrará aquí.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
