import type { EchoSlotIndexProps } from "@/components/shared-ui/build/_types";

import { useStore } from "zustand";
import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { Slider } from "@/components/ui/slider";

export function BuildEchoLevel(props: EchoSlotIndexProps) {
  const { echoSlotIndex } = props;

  const echoSelected = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout[echoSlotIndex].selected,
  );

  const echoLevel = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout[echoSlotIndex].level,
  );

  const setEchoLevel = useStore(
    useBuildEditorStore,
    (state) => state.setEchoLevel,
  );

  const handleChangeEchoLevel = (value: number[]) => {
    if (!echoSelected) return;

    const level = value[0];
    setEchoLevel(echoSlotIndex, level);
  };

  return (
    <div className="space-y-2">
      <h2>
        Nivel: <span className="font-bold">{echoLevel * 5}</span>
      </h2>
      <Slider
        disabled={!echoSelected}
        defaultValue={[echoLevel]}
        onValueChange={handleChangeEchoLevel}
        min={1}
        max={5}
      />
    </div>
  );
}
