import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { getWeaponMainStat } from "@/utils/general-utils";
import { useStore } from "zustand";
import { StatIcon } from "@/components/icons-ui/stat-icon";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircleIcon } from "lucide-react";

export function BuildWeaponStats() {
  const MIN_LEVELS = 0;

  const weaponLevels = useStore(
    useBuildEditorStore,
    (state) => state.weaponConfig?.selected?.levels ?? [],
  );

  if (weaponLevels.length <= MIN_LEVELS) {
    return (
      <div className="col-span-2">
        <Alert>
          <AlertCircleIcon />
          <AlertTitle>Niveles no disponibles</AlertTitle>
          <AlertDescription>
            Los niveles de este resonador no están disponibles en este momento.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="col-span-2 space-y-4">
      <BuildWeaponLevels />
      <BuildWeaponRefinament />
    </div>
  );
}

export function BuildWeaponLevels() {
  const weaponSelected = useStore(
    useBuildEditorStore,
    (state) => state.weaponConfig?.selected,
  );

  const weaponLevel = useStore(
    useBuildEditorStore,
    (state) => state.weaponConfig?.level ?? 0,
  );

  const setWeaponLevel = useStore(
    useBuildEditorStore,
    (state) => state.setWeaponLevel,
  );

  const handleChangeLevel = (value: number[]) => {
    const level = value[0];
    setWeaponLevel(level);
  };

  return (
    <div className="col-span-2 space-y-2">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Nivel: {weaponLevel * 10}</h2>
        <Slider
          defaultValue={[weaponLevel * 10]}
          onValueChange={handleChangeLevel}
          min={1}
          max={9}
          step={1}
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <StatIcon stat="atk" />
          <p>
            Ataque:{" "}
            <span>{weaponSelected?.levels[weaponLevel - 1]?.atk ?? 0}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatIcon stat={weaponSelected?.main_stat || "none"} />
          <p>
            {getWeaponMainStat(weaponSelected?.main_stat || "none").label}:{" "}
            <span>
              {weaponSelected?.levels[weaponLevel - 1]?.stat_value ?? 0}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function BuildWeaponRefinament() {
  const refinamentRank = useStore(
    useBuildEditorStore,
    (state) => state.weaponConfig?.refinamentRank ?? 1,
  );

  const setRefinamentRank = useStore(
    useBuildEditorStore,
    (state) => state.setRefinamentRank,
  );

  const handleChangeLevel = (value: number[]) => {
    const level = value[0];
    setRefinamentRank(level);
  };

  return (
    <Card className="bg-input/30">
      <CardHeader>
        <div className="space-y-4">
          <CardTitle>Cadena de resonancia: {refinamentRank}</CardTitle>
          <Slider
            defaultValue={[refinamentRank]}
            onValueChange={handleChangeLevel}
            min={1}
            max={5}
            step={1}
          />
        </div>
      </CardHeader>
    </Card>
  );
}
