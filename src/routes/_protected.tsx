import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Routes } from "@/models/routes";
import Header from "@/components/common/Header";
import { getTokens } from "@/utils/tokens";
import { useEffect } from "react";
import { socket } from "@/socket";

export const Route = createFileRoute("/_protected")({
  component: App,
  beforeLoad: () => {
    const token = getTokens();
    if (!token) throw redirect({ to: `${Routes.AUTH}${Routes.LOGIN}` });
  },
});

function App() {
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      // console.log("Connected")
    })
    return () => {
      socket.disconnect();
    }
  }, [])

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
