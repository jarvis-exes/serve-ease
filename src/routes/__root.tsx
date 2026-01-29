import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { ContextType } from "@/models";

const RootComponent = () => (
  <>
    <Outlet />
    <TanStackDevtools
      config={{
        position: "bottom-right",
      }}
      plugins={[
        {
          name: "Tanstack Router",
          render: <TanStackRouterDevtoolsPanel />,
        },
      ]}
    />
  </>
);

export const Route = createRootRouteWithContext<ContextType>()({
  component: RootComponent,
});
