import {
  EchoEmpty,
  EchoItem,
} from "@/routes/_protected/panel/echoes/-components";
import { cn } from "@/lib/utils";
import { listGridClass } from "@/tw-class";
import { useEchoesList } from "@/routes/_protected/panel/echoes/-hooks";

export function EchoList() {
  const { filteredEchoes } = useEchoesList();

  if (!filteredEchoes.length) return <EchoEmpty />;

  const MAPPED_ECHOES = filteredEchoes.map((echo) => (
    <li key={echo.id}>
      <EchoItem {...echo} />
    </li>
  ));

  return <ul className={cn(listGridClass)}>{MAPPED_ECHOES}</ul>;
}
