import type { EchoSlotIndexProps } from "@/components/shared-ui/build/_types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "zustand";
import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { EchoIcon } from "@/components/icons-ui/echo-icon";

export function BuildEchoSonata(props: EchoSlotIndexProps) {
  const { echoSlotIndex } = props;

  const echoSelected = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout[echoSlotIndex].selected,
  );

  const setEchoSonata = useStore(
    useBuildEditorStore,
    (state) => state.setEchoSonata,
  );

  const echoSets = echoSelected?.sets ? echoSelected.sets : [];

  const handleChangeEchoSonata = (value: string) => {
    console.log(echoSlotIndex);
    setEchoSonata(echoSlotIndex, value);
  };

  return (
    <div className="flex">
      <Select disabled={!echoSelected} onValueChange={handleChangeEchoSonata}>
        <SelectTrigger className="flex! flex-1!">
          <SelectValue placeholder="Efecto de sonata" />
        </SelectTrigger>
        <SelectContent>
          {echoSets.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <EchoIcon className="size-6" echoType={item.value} />
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
