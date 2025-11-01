import { EchoIcon } from "@/components/icons-ui/echo-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTRPC } from "@/trpc/root";
import { getEchoSet } from "@/utils/general-utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export function EchoSetDetails() {
  const { id } = useParams({ from: "/_protected/panel/echoes/$id/" });
  const trpc = useTRPC();
  const echoQueryOpts = trpc.echoes.unique.queryOptions({ id });
  const { data: echoes } = useSuspenseQuery(echoQueryOpts);

  return (
    <Card>
      <CardHeader className="gap-0">
        <CardTitle className="text-2xl">Conjunto de ecos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {echoes.sets.map((item) => {
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
