import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { useStore } from "zustand";
import { WeaponIcon } from "@/components/icons-ui/weapon-icon";
import { ElementIcon } from "@/components/icons-ui/element-icon";
import { Separator } from "@/components/ui/separator";
import { BuildResonatorResonatorStats } from "@/components/shared-ui/build/resonator/build-resonator-stats";
import { BuildResonatorSelector } from "@/components/shared-ui/build/resonator/build-resonator-selector";
import { BuildResonatorSequences } from "@/components/shared-ui/build/resonator/build-resonator-sequences";
import { BuildResonatorEmpty } from "@/components/shared-ui/build/resonator/build-resonator-empty";

export function BuildResonatorInformation() {
  const resonatorSelected = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.selected,
  );

  if (!resonatorSelected) {
    return <BuildResonatorEmpty />;
  }

  return (
    <section className="space-y-4">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl">
          {resonatorSelected
            ? "Configurando resonador"
            : "Selecciona un resonador"}
        </h2>
        <BuildResonatorSelector />
      </header>

      <Card className="bg-input/30">
        <CardHeader className="gap-0">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl">
                {resonatorSelected.name}
              </CardTitle>
              <CardDescription>{resonatorSelected.title}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <WeaponIcon
                className="size-12"
                weaponType={resonatorSelected.weapon_type}
              />
              <ElementIcon
                className="size-12"
                elementType={resonatorSelected.element_type}
              />
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            <img
              className="w-full h-auto object-cover -translate-y-12"
              src={resonatorSelected.splash_image}
              alt={resonatorSelected.name}
            />
            <div className="space-y-4">
              <BuildResonatorResonatorStats />
              <BuildResonatorSequences />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
