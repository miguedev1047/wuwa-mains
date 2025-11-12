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

interface BuildResonatorSelectorProps {
  isCompatibleWeapon?: boolean;
}

export function BuildWeaponEmpty(props: BuildResonatorSelectorProps) {
  const { isCompatibleWeapon = false } = props;

  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <SwordIcon />
        </EmptyMedia>
        <EmptyTitle>
          {isCompatibleWeapon ? "Arma no compatible" : "Selecciona un arma"}
        </EmptyTitle>
        <EmptyDescription>
          {isCompatibleWeapon
            ? "Esta arma no es compatible con este resanador. Selecciona otra arma."
            : "Selecciona un arma para ir armando tu tarjeta."}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <BuildWeaponSelector />
      </EmptyContent>
    </Empty>
  );
}
