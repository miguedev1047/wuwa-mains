import {
  BoxIcon,
  HammerIcon,
  HomeIcon,
  SwordIcon,
  User2Icon,
  UsersIcon,
  VenetianMaskIcon,
} from "lucide-react";

export const PANEL_ROUTES = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      roles: ["ADMIN", "EDITOR", "USER"],
      items: [
        {
          title: "Inicio",
          url: "/panel/home",
          icon: HomeIcon,
        },
        {
          title: "Mis resonadores",
          url: "/panel/my-resonators",
          icon: UsersIcon,
        },
      ],
    },
    {
      title: "Editar",
      url: "#",
      roles: ["ADMIN", "EDITOR"],
      items: [
        {
          title: "Resonadores",
          url: "/panel/resonators",
          icon: User2Icon,
        },
        {
          title: "Armas",
          url: "/panel/weapons",
          icon: SwordIcon,
        },
        {
          title: "Materiales",
          url: "/panel/materials",
          icon: BoxIcon,
        },
        {
          title: "Ecos",
          url: "/panel/echoes",
          icon: VenetianMaskIcon,
        },
      ],
    },
    {
      title: "Administración",
      url: "#",
      roles: ["ADMIN"],
      items: [
        {
          title: "Configuración",
          url: "/panel/admin/config",
          icon: HammerIcon,
        },
      ],
    },
  ],
};

export type PanelRouteProps = typeof PANEL_ROUTES;
