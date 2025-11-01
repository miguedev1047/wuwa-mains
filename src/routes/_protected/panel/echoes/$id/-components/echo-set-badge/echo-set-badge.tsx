import { Badge } from "@/components/ui/badge";
import { useTRPC } from "@/trpc/root";
import { getEchoSet } from "@/utils/general-utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export function EchoSetBadges() {
  const { id } = useParams({ from: "/_protected/panel/echoes/$id/" });
  const trpc = useTRPC();
  const echoQueryOpts = trpc.echoes.unique.queryOptions({ id });
  const { data: echoes } = useSuspenseQuery(echoQueryOpts);

  return (
    <div className="flex flex-wrap gap-2">
      {echoes.sets.map((item) => {
        const echoSet = getEchoSet(item.value);
        return <Badge key={item.id}>{echoSet.label}</Badge>;
      })}
    </div>
  );
}
