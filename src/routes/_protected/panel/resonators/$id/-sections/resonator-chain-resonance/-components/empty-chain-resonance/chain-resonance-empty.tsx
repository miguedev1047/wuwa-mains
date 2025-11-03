import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { LayersIcon } from "lucide-react";

export function EmptyChainResonance() {
  return (
    <Empty className="w-full border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <LayersIcon />
        </EmptyMedia>
        <EmptyTitle>No hay cadena de resonancias para mostrar</EmptyTitle>
        <EmptyDescription>
          Aún no hay registros en esta lista. Añade una cadena de resonancia y
          se mostrará aquí.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
