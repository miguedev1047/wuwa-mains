import { createFileRoute } from "@tanstack/react-router";
import { BuildResonatorInformation } from "@/components/shared-ui/build/resonator/build-resonator-information";
import { BuildWeaponInformation } from "@/components/shared-ui/build/weapon/build-weapon-information";
import { BuildEchoInformation } from "@/components/shared-ui/build/echo/build-echo-information";

export const Route = createFileRoute("/_protected/panel/my-resonators/create/")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return (
    <main className="space-y-8">
      <BuildResonatorInformation />
      <BuildWeaponInformation />
      <BuildEchoInformation />
    </main>
  );
}
