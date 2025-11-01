import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

const plugins = [
  {
    name: "Tanstack Router",
    render: <TanStackRouterDevtoolsPanel />,
  },
  {
    name: "Tanstack Query",
    render: <ReactQueryDevtoolsPanel />,
  },
];

export function Devtools() {
  return (
    import.meta.env.DEV && (
      <TanStackDevtools
        config={{ position: "bottom-right" }}
        plugins={plugins}
      />
    )
  );
}
