import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate, useRouteContext } from "@tanstack/react-router";
import { PANEL_ROUTES } from "@wuwa-mains/constants/constants/panel-routes";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronsUpDown, FlameIcon, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFindRoute } from "@/hooks/use-find-route";
import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";
import { Suspense, Fragment } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useIsMounted } from "@/hooks/use-is-mounted";

export function PanelSidebarSkeletons() {
  const MAP_SKELETONS = [...Array(8)].map((_, index) => (
    <SidebarMenuSkeleton key={index} />
  ));
  return <Fragment>{MAP_SKELETONS}</Fragment>;
}

export function PanelSiteHeader() {
  const { findRoute } = useFindRoute();

  const hasTitle = findRoute?.title ? (
    <h2>{findRoute?.title}</h2>
  ) : (
    <Skeleton className="h-4 w-24" />
  );

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) px-4">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {hasTitle}
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}

export function PanelSidebarHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link to="/panel/home">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <FlameIcon />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium"> Wuwa Diary</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function PanelSidebarContentRoutes() {
  const { role } = useRouteContext({ from: "/_protected" });

  if (!role) return <PanelSidebarSkeletons />;

  const filteredRoutes = PANEL_ROUTES.navMain.filter((route) =>
    route.roles.includes(role!),
  );

  return (
    <>
      {filteredRoutes.map((category) => (
        <SidebarGroup key={category.title}>
          <SidebarGroupLabel>{category.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {category.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      activeProps={{ className: `bg-sidebar-accent` }}
                      to={item.url}
                    >
                      {item.icon && <item.icon />}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}

export function PanelSidebarProfile() {
  const { user } = useRouteContext({ from: "/_protected" });
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  useIsMounted();

  if (!user) return <Skeleton className="w-full h-8" />;

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/" });
          toast.success("Cerrando sesión...");
        },
        onError: () => {
          toast.error("Error al cerrar sesión.");
        },
      },
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image!} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name.at(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image!} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.at(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignout}>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function PanelSidebarApp() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <PanelSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <Suspense fallback={<PanelSidebarSkeletons />}>
          <PanelSidebarContentRoutes />
        </Suspense>
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<Skeleton className="w-full h-10" />}>
          <PanelSidebarProfile />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}

export function PanelSidebarRoot({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <PanelSidebarApp />
      <SidebarInset>
        <PanelSiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
