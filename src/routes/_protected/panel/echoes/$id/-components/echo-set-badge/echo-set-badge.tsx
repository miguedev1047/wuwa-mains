import { Badge } from "@/components/ui/badge";
import { getEchoSet } from "@/utils/general-utils";
import { useGetEcho } from "@panel/echoes/$id/-hooks/use-get-echo";

export function EchoSetBadges() {
  const echo = useGetEcho();

  return (
    <div className="flex flex-wrap gap-2">
      {echo.sets.map((item) => {
        const echoSet = getEchoSet(item.value);
        return <Badge key={item.id}>{echoSet.label}</Badge>;
      })}
    </div>
  );
}
