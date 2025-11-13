import { EchoConfig } from "@/services/store/build-editor-store/types";

export const disabledEchoOpts = (
  echoLoadout: EchoConfig[],
  echoSlotIndex: number,
  value: string,
) => {
  const echoItem = echoLoadout[echoSlotIndex];
  return (
    echoItem.sub_stat_1.stat === value ||
    echoItem.sub_stat_2.stat === value ||
    echoItem.sub_stat_3.stat === value ||
    echoItem.sub_stat_4.stat === value ||
    echoItem.sub_stat_5.stat === value
  );
};
