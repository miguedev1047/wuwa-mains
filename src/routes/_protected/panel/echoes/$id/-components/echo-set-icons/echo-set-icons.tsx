import { EchoIcon } from "@/components/icons-ui/echo-icon";
import { getEchoSet } from "@/utils/general-utils";
import { useGetEcho } from "@panel/echoes/$id/-hooks/use-get-echo";

export function EchoSetIcons() {
  const echo = useGetEcho();

  return (
    <div className="flex flex-wrap gap-2">
      {echo.sets.map((item) => {
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
