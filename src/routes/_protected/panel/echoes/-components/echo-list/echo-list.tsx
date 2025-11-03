import { EchoEmpty } from "@panel/echoes/-components/echo-empty";
import { EchoItem } from "@panel/echoes/-components/echo-item";
import { cn } from "@/lib/utils";
import { listGridClass } from "@/tw-class";
import { useEchoesList } from "@panel/echoes/-hooks/use-echo-list";

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
