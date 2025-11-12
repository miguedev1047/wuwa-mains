import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { useStore } from "zustand";
import { getWeaponMainStat, getWeaponType } from "@/utils/general-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeaponIcon } from "@/components/icons-ui/weapon-icon";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SquareBox } from "@/components/shared-ui/square-box";
import { TiptapPreview } from "@/components/shared-ui/editor";
import { BuildWeaponStats } from "@/components/shared-ui/build/weapon/build-weapon-stats";
import { BuildWeaponSelector } from "@/components/shared-ui/build/weapon/build-weapon-selector";
import { BuildWeaponEmpty } from "@/components/shared-ui/build/weapon/build-weapon-empty";

export function BuildWeaponInformation() {
  const resonatorSelected = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.selected,
  );

  const weaponSelected = useStore(
    useBuildEditorStore,
    (state) => state.weaponConfig?.selected,
  );

  const isSameWeaponType = useStore(useBuildEditorStore, (state) =>
    state.isSameResonatorAndWeapon(),
  );

  if (!resonatorSelected) {
    return <BuildWeaponEmpty isSelectedResonator />;
  }

  if (!weaponSelected) {
    return <BuildWeaponEmpty />;
  }

  if (!isSameWeaponType) {
    return <BuildWeaponEmpty isNotCompatibleWeapon />;
  }

  return (
    <section className="space-y-4">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl">
          {weaponSelected ? "Configurando arma" : "Selecciona un arma"}
        </h2>
        <BuildWeaponSelector />
      </header>

      <Card className="bg-input/30">
        <CardHeader className="gap-0">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl">{weaponSelected.name}</CardTitle>
              <div className="space-x-2">
                <Badge>{getWeaponType(weaponSelected.weapon_type).label}</Badge>
                <Badge>
                  {getWeaponMainStat(weaponSelected.main_stat).label}
                </Badge>
              </div>
            </div>
            <WeaponIcon
              className="size-12"
              weaponType={weaponSelected.weapon_type}
            />
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="grid grid-cols-6 gap-8">
            <BuildWeaponContent />
            <BuildWeaponStats />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export function BuildWeaponContent() {
  const weaponSelected = useStore(
    useBuildEditorStore,
    (state) => state.weaponConfig?.selected,
  );

  if (!weaponSelected) {
    return null;
  }

  return (
    <>
      <figure className="col-span-1">
        <SquareBox size="full">
          <img src={weaponSelected.avatar_image} alt={weaponSelected.name} />
        </SquareBox>
      </figure>
      <div className="col-span-3">
        <TiptapPreview key={+new Date()} content={weaponSelected.passive} />
      </div>
    </>
  );
}
