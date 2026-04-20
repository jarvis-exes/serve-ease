import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { ContextType } from "@/models";

const RootComponent = () => (
  <div>
    <Outlet />
  </div>
);

export const Route = createRootRouteWithContext<ContextType>()({
  component: RootComponent,
});
