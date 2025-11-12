import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SwordIcon } from "lucide-react";
import { BuildWeaponSelector } from "@/components/shared-ui/build/weapon/build-weapon-selector";
import { BuildResonatorSelector } from "@/components/shared-ui/build/resonator/build-resonator-selector";

interface BuildResonatorSelectorProps {
  isNotCompatibleWeapon?: boolean;
  isSelectedResonator?: boolean;
}

export function BuildWeaponEmpty(props: BuildResonatorSelectorProps) {
  const {
    isNotCompatibleWeapon: isCompatibleWeapon = false,
    isSelectedResonator = false,
  } = props;

  if (isSelectedResonator) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia>
            <SwordIcon />
          </EmptyMedia>
          <EmptyTitle>Selecciona un resonador primero</EmptyTitle>
          <EmptyDescription>
            Para establecer un arma, selecciona un resonador
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <BuildResonatorSelector />
        </EmptyContent>
      </Empty>
    );
  }

  if (isCompatibleWeapon) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia>
            <SwordIcon />
          </EmptyMedia>
          <EmptyTitle>Arma no compatible</EmptyTitle>
          <EmptyDescription>
            Esta arma no es compatible con este resanador. Selecciona otra arma.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <BuildWeaponSelector />
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <SwordIcon />
        </EmptyMedia>
        <EmptyTitle>Selecciona un arma</EmptyTitle>
        <EmptyDescription>
          Selecciona un arma para ir armando tu tarjeta.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <BuildWeaponSelector />
      </EmptyContent>
    </Empty>
  );
}
