import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { ContextType } from "@/models";

const RootComponent = () => (
  <div className="h-screen flex flex-col">
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
  </div>
);

export const Route = createRootRouteWithContext<ContextType>()({
  component: RootComponent,
});
