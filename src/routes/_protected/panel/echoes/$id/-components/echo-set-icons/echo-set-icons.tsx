import { EchoIcon } from "@/components/icons-ui/echo-icon";
import { useTRPC } from "@/trpc/root";
import { getEchoSet } from "@/utils/general-utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export function EchoSetIcons() {
  const { id } = useParams({ from: "/_protected/panel/echoes/$id/" });
  const trpc = useTRPC();
  const echoQueryOpts = trpc.echoes.unique.queryOptions({ id });
  const { data: echoes } = useSuspenseQuery(echoQueryOpts);

  return (
    <div className="flex flex-wrap gap-2">
      {echoes.sets.map((item) => {
        const echoSet = getEchoSet(item.value);
        return (
          <EchoIcon
            key={item.id}
            className="size-10"
            echoType={echoSet.value}
          />
        );
      })}
    </div>
  );
}
