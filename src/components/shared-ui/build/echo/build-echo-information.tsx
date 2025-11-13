import { useStore } from "zustand";
import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { Card, CardContent } from "@/components/ui/card";
import { EchoConfig } from "@/services/store/build-editor-store/types";
import { BuildEchoSelector } from "@/components/shared-ui/build/echo/build-echo-selector";
import { BuildEchoSelected } from "@/components/shared-ui/build/echo/build-echo-selected";
import { BuildEchoLevel } from "@/components/shared-ui/build/echo/build-echo-level";
import { BuildEchoMainStat } from "@/components/shared-ui/build/echo/build-echo-mainstat";
import { BuildEchoSonata } from "@/components/shared-ui/build/echo/build-echo-sonata";
import { BuildEchoSubstat } from "@/components/shared-ui/build/echo/build-echo-substat";

export function BuildEchoInformation() {
  const echoLoadout = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout,
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl col-span-5">Introduce tus ecos</h2>
      <ul className="grid grid-cols-5 gap-6">
        {echoLoadout.map((echo, index) => (
          <BuildEchoItem key={index} echo={echo} echoSlotIndex={index} />
        ))}
      </ul>
    </div>
  );
}

interface BuildEchoItemProps {
  echo: EchoConfig;
  echoSlotIndex: number;
}

export function BuildEchoItem(props: BuildEchoItemProps) {
  const { echoSlotIndex } = props;

  return (
    <Card>
      <CardContent>
        <div className="space-y-6">
          <BuildEchoSelector echoSlotIndex={echoSlotIndex} />
          <BuildEchoSelected echoSlotIndex={echoSlotIndex} />
          <div className="space-y-5">
            <BuildEchoLevel echoSlotIndex={echoSlotIndex} />
            <BuildEchoMainStat echoSlotIndex={echoSlotIndex} />
            <BuildEchoSonata echoSlotIndex={echoSlotIndex} />

            <div className="space-y-4 pt-5">
              <BuildEchoSubstat
                echoSlotIndex={echoSlotIndex}
                subStatKey="sub_stat_1"
              />
              <BuildEchoSubstat
                echoSlotIndex={echoSlotIndex}
                subStatKey="sub_stat_2"
              />
              <BuildEchoSubstat
                echoSlotIndex={echoSlotIndex}
                subStatKey="sub_stat_3"
              />
              <BuildEchoSubstat
                echoSlotIndex={echoSlotIndex}
                subStatKey="sub_stat_4"
              />
              <BuildEchoSubstat
                echoSlotIndex={echoSlotIndex}
                subStatKey="sub_stat_5"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
