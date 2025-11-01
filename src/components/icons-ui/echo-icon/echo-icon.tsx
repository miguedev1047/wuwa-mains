import CelestialLightIcon from "./assets/celestial-light-icon.png";
import CrownOfValorIcon from "./assets/crown-of-valor-icon.png";
import DreamOfTheLostIcon from "./assets/dream-of-the-lost-icon.png";
import EmpyreanAnthemIcon from "./assets/empyrean-anthem-icon.png";
import EternalRadianceIcon from "./assets/eternal-radiance-icon.png";
import FlamewingShadowIcon from "./assets/flamewings-shadows.png";
import FlamingClawprintIcon from "./assets/flaming-clawprint-icon.png";
import FreezingFrostIcon from "./assets/freezing-frost-icon.png";
import FrostyResolveIcon from "./assets/frosty-resolve-icon.png";
import GustsOfWelkinIcon from "./assets/guts-of-welkin-icon.png";
import SunSinkingEclipseIcon from "./assets/havoc-eclipse-icon.png";
import LawOfHarmonyIcon from "./assets/law-of-harmony-icon.png";
import LingeringTunesIcon from "./assets/lingering-tunes-icon.png";
import MidnightVeilIcon from "./assets/midnight-veil-icon.png";
import MoltenRiftIcon from "./assets/molten-rift-icon.png";
import MoonlitCloudsIcon from "./assets/moonlit-clouds-icon.png";
import RejuvenatingGlowIcon from "./assets/rejuvenating-glow-icon.png";
import SierraGaleIcon from "./assets/sierra-gale-icon.png";
import ThreadOfSeveredFateIcon from "./assets/thread-of-severed-fate-icon.png";
import TidebreakingCourageIcon from "./assets/tidebreaking-courage.png";
import VoidThunderIcon from "./assets/void-thunder-icon.png";
import WindwardPilgrimageIcon from "./assets/windward-pilgrimage-icon.png";

import { cn } from "@/lib/utils";

const Icons: Record<string, string> = {
  freezing_frost: FreezingFrostIcon,
  molten_rift: MoltenRiftIcon,
  void_thunder: VoidThunderIcon,
  sierra_gale: SierraGaleIcon,
  celestial_light: CelestialLightIcon,
  sun_sinking_eclipse: SunSinkingEclipseIcon,
  rejuvenating_glow: RejuvenatingGlowIcon,
  moonlit_clouds: MoonlitCloudsIcon,
  lingering_tunes: LingeringTunesIcon,
  midnight_veil: MidnightVeilIcon,
  empyrean_anthem: EmpyreanAnthemIcon,
  tidebreaking_courage: TidebreakingCourageIcon,
  frosty_resolve: FrostyResolveIcon,
  eternal_radiance: EternalRadianceIcon,
  gusts_of_welkin: GustsOfWelkinIcon,
  flaming_clawprint: FlamingClawprintIcon,
  windward_pilgrimage: WindwardPilgrimageIcon,
  dream_of_the_lost: DreamOfTheLostIcon,
  crown_of_valor: CrownOfValorIcon,
  law_of_harmony: LawOfHarmonyIcon,
  flamewing_shadow: FlamewingShadowIcon,
  thread_of_severed_fate: ThreadOfSeveredFateIcon,
};

interface EchoIconProps extends React.ComponentProps<"img"> {
  echoType: string;
}

export function EchoIcon({ echoType, className }: EchoIconProps) {
  const icon = Icons[echoType];
  if (!icon) return null;

  return (
    <img
      src={icon}
      alt={echoType}
      loading="lazy"
      className={cn("size-20 pointer-events-none select-none", className)}
    />
  );
}
