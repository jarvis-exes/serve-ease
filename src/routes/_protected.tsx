import { createFileRoute, Navigate, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { Routes } from "@/models/routes";
import Header from "@/components/menu/Header";
import { getTokens, getUser } from "@/utils/tokens";
import { useEffect } from "react";
import { socket } from "@/socket";
import { ToastContainer } from "react-toastify";
import { Roles } from "@/enums/roles.enum";

export const Route = createFileRoute("/_protected")({
  component: App,
  beforeLoad: () => {
    const token = getTokens();
    if (!token) throw redirect({ to: `${Routes.AUTH}${Routes.LOGIN}` });
  },
});

function App() {
  const user = getUser();
  const location = useLocation();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
    })
    return () => {
      socket.disconnect();
    }
  }, [])

  if (user?.role === Roles.KITCHEN && location.pathname !== "/kitchen") {
    return <Navigate to="/kitchen" search={{tab: 'PREPARING'}} />;
  }

  return (
    <div className="h-dvh flex flex-col bg-slate-100">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <ToastContainer autoClose={1500} />
    </div>
  );
}
