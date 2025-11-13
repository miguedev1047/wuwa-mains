import { StatIcon } from "@/components/icons-ui/stat-icon";
import type { EchoSlotIndexProps } from "@/components/shared-ui/build/_types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SELECT_ECHOES_MAIN_STATS } from "@/data/constants";
import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { useStore } from "zustand";

export function BuildEchoMainStat(props: EchoSlotIndexProps) {
  const { echoSlotIndex } = props;

  const echoSelected = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout[echoSlotIndex].selected,
  );

  const echoMainstat = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout[echoSlotIndex].mainStat,
  );

  const echoLevel = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout[echoSlotIndex].level,
  );

  const setEchoMainStat = useStore(
    useBuildEditorStore,
    (state) => state.setEchoMainStat,
  );

  const MAIN_STATS = SELECT_ECHOES_MAIN_STATS[echoSelected?.cost ?? "cost_1"];
  const STAT_VALUE = MAIN_STATS.find((stat) => stat.value === echoMainstat);
  const STAT_LEVELS = STAT_VALUE?.levels[echoLevel];

  const handleChangeMainstat = (value: string) => {
    setEchoMainStat(echoSlotIndex, value);
  };

  return (
    <div className="flex items-center gap-2">
      <Select disabled={!echoSelected} onValueChange={handleChangeMainstat}>
        <SelectTrigger className="flex flex-1">
          <SelectValue className="line-clamp-1" placeholder="Est. Principal" />
        </SelectTrigger>
        <SelectContent>
          {MAIN_STATS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <StatIcon stat={item.value} />
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {STAT_LEVELS && <h2 className="font-bold">{STAT_LEVELS}%</h2>}
    </div>
  );
}
