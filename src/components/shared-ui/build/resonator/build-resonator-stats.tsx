import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { useStore } from "zustand";
import { StatIcon } from "@/components/icons-ui/stat-icon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { AlertCircleIcon } from "lucide-react";

export function BuildResonatorResonatorStats() {
  const MIN_LEVELS = 0;

  const resonatorLevels = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.selected?.level ?? [],
  );

  if (resonatorLevels.length <= MIN_LEVELS) {
    return (
      <Card className="bg-input/30">
        <CardContent>
          <Alert>
            <AlertCircleIcon />
            <AlertTitle>Niveles no disponibles</AlertTitle>
            <AlertDescription>
              Los niveles de este resonador no están disponibles en este
              momento.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-input/30">
      <CardContent>
        <div className="space-y-4">
          <BuildResonatorLevel />
          <BuildResonatorChainResonance />
        </div>
      </CardContent>
    </Card>
  );
}

export function BuildResonatorLevel() {
  const resonatorSelected = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.selected,
  );
  const resonatorLevel = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.level ?? 0,
  );

  const setResonatorLevel = useStore(
    useBuildEditorStore,
    (state) => state.setResonatorLevel,
  );

  const handleChangeLevel = (value: number[]) => {
    const level = value[0];
    setResonatorLevel(level);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Nivel: {resonatorLevel * 10}</h2>
        <Slider
          defaultValue={[resonatorLevel * 10]}
          onValueChange={handleChangeLevel}
          min={1}
          max={9}
          step={1}
        />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <StatIcon stat="hp" />
          <p>
            Vida:{" "}
            <span>{resonatorSelected?.level[resonatorLevel - 1]?.hp ?? 0}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatIcon stat="atk" />
          <p>
            Ataque:{" "}
            <span>
              {resonatorSelected?.level[resonatorLevel - 1]?.atq ?? 0}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatIcon stat="def" />
          <p>
            Defensa:{" "}
            <span>
              {resonatorSelected?.level[resonatorLevel - 1]?.def ?? 0}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function BuildResonatorChainResonance() {
  const sequenceRank = useStore(
    useBuildEditorStore,
    (state) => state.resonatorConfig?.sequenceRank ?? 0,
  );

  const setSequenceRank = useStore(
    useBuildEditorStore,
    (state) => state.setSequenceRank,
  );

  const handleChangeSequenceRank = (value: number[]) => {
    const sequence_rank = value[0];
    setSequenceRank(sequence_rank);
  };

  return (
    <Card className="bg-input/30">
      <CardHeader>
        <div className="space-y-4">
          <CardTitle>Cadena de resonancia: {sequenceRank}</CardTitle>
          <Slider
            defaultValue={[sequenceRank]}
            onValueChange={handleChangeSequenceRank}
            min={1}
            max={6}
            step={1}
          />
        </div>
      </CardHeader>
    </Card>
  );
}
