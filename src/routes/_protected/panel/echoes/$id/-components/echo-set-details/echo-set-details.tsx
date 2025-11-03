import { EchoIcon } from "@/components/icons-ui/echo-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getEchoSet } from "@/utils/general-utils";
import { useGetEcho } from "@panel/echoes/$id/-hooks/use-get-echo";

export function EchoSetDetails() {
  const echo = useGetEcho();

  return (
    <Card>
      <CardHeader className="gap-0">
        <CardTitle className="text-2xl">Conjunto de ecos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {echo.sets.map((item) => {
            const echoSet = getEchoSet(item.value);
            return (
              <Card key={item.id}>
                <CardHeader className="gap-0">
                  <div className="flex items-center gap-3">
                    <EchoIcon className="size-10" echoType={echoSet.value} />
                    <CardTitle>{echoSet.label}</CardTitle>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div>
                    {echoSet.description.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
