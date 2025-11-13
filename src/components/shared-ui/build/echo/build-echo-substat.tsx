import type { EchoSlotIndexProps } from "@/components/shared-ui/build/_types";
import type { SubStatKey } from "@/services/store/build-editor-store/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SELECT_ECHOES_SUBSTATS,
  SELECT_SUBSTATS_OPTIONS,
} from "@/data/constants";
import { formatStatValue } from "@/helpers/decimal-value";
import { useStore } from "zustand";
import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { disabledEchoOpts } from "@/helpers/echo-checks";
import { StatIcon } from "@/components/icons-ui/stat-icon";

interface BuildEchoSubstatProps extends EchoSlotIndexProps {
  subStatKey: SubStatKey;
}

export function BuildEchoSubstat(props: BuildEchoSubstatProps) {
  const { echoSlotIndex, subStatKey } = props;

  const echoLoadout = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout,
  );

  const echoSelected = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout[echoSlotIndex].selected,
  );

  const echoSubstat = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout[echoSlotIndex][subStatKey],
  );

  const getSubstatNumber = parseInt(subStatKey.split("_")[2]);

  const updateEchoSubStat = useStore(
    useBuildEditorStore,
    (state) => state.updateEchoSubStat,
  );

  return (
    <div className="flex flex-col gap-1">
      <Select
        disabled={!echoSelected}
        onValueChange={(stat) =>
          updateEchoSubStat(echoSlotIndex, subStatKey, { stat })
        }
      >
        <SelectTrigger className="flex flex-1 w-full">
          <SelectValue placeholder={`Esta. Secundaria ${getSubstatNumber}`} />
        </SelectTrigger>
        <SelectContent>
          {SELECT_ECHOES_SUBSTATS.map((item) => (
            <SelectItem
              disabled={disabledEchoOpts(
                echoLoadout,
                echoSlotIndex,
                item.value,
              )}
              key={item.value}
              value={item.value}
            >
              <StatIcon stat={item.value} />
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {echoSubstat.stat && (
        <Select
          disabled={!echoSelected}
          onValueChange={(value) =>
            updateEchoSubStat(echoSlotIndex, subStatKey, {
              value: parseFloat(value),
            })
          }
        >
          <SelectTrigger className="flex flex-1 w-full">
            <SelectValue placeholder="0%" />
          </SelectTrigger>
          <SelectContent>
            {SELECT_SUBSTATS_OPTIONS[echoSubstat.stat].map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {formatStatValue(echoSubstat.stat, option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
