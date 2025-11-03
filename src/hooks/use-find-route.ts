import { PANEL_ROUTES } from "@/data/constants";
import { useLocation } from "@tanstack/react-router";

export function useFindRoute() {
  const location = useLocation();
  const pathname = location.pathname;

  const filteredRoutes = PANEL_ROUTES.navMain.find((route) =>
    route.items.find((item) => pathname.includes(item.url)),
  );
  const findRoute = filteredRoutes?.items.find((item) =>
    pathname.includes(item.url),
  );

  return { findRoute };
}
