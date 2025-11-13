import type { EchoSlotIndexProps } from "@/components/shared-ui/build/_types";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStore } from "zustand";
import { useBuildEditorStore } from "@/services/store/build-editor-store";
import { SquareBox } from "@/components/shared-ui/square-box";
import { Card, CardContent } from "@/components/ui/card";

export function BuildEchoSelected(props: EchoSlotIndexProps) {
  const { echoSlotIndex } = props;

  const echoSelected = useStore(
    useBuildEditorStore,
    (state) => state.echoLoadout[echoSlotIndex].selected,
  );

  if (!echoSelected) {
    return (
      <SquareBox size="full">
        <div className="size-full grid place-items-center">Slot vacio</div>
      </SquareBox>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="bg-input/30">
          <CardContent>
            <SquareBox size="full">
              <img
                src={echoSelected.avatar_image}
                alt={echoSelected.name}
                className="aspect-square"
              />
            </SquareBox>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent side="bottom">{echoSelected.name}</TooltipContent>
    </Tooltip>
  );
}
