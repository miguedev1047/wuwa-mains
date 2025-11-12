import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { UsersIcon } from "lucide-react";
import { BuildResonatorSelector } from "@/components/shared-ui/build/resonator/build-resonator-selector";

export function BuildResonatorEmpty() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <UsersIcon />
        </EmptyMedia>
        <EmptyTitle>Selecciona un resonador</EmptyTitle>
        <EmptyDescription>
          Selecciona un resonador para ir armando tu tarjeta.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <BuildResonatorSelector />
      </EmptyContent>
    </Empty>
  );
}
