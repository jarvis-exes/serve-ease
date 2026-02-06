import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Routes } from "@/models/routes";
import Header from "@/components/common/Header";
import { getAuthUser } from "@/utils/tokens";

export const Route = createFileRoute("/_protected")({
  component: App,
  beforeLoad: () => {
    const authUser = getAuthUser();
    if (!authUser) throw redirect({ to: `${Routes.AUTH}${Routes.LOGIN}` });
  },
});

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
