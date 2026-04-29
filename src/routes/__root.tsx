import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { ContextType } from "@/models";
import { SkeletonTheme } from "react-loading-skeleton";

const RootComponent = () => (
  <div>
    <SkeletonTheme baseColor="#FFFFFF" highlightColor="#e2e8f0">
      <Outlet />
    </SkeletonTheme>
  </div>
);

export const Route = createRootRouteWithContext<ContextType>()({
  component: RootComponent,
});
