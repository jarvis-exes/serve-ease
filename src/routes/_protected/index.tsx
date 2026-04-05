import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "./-dashboard/Dashboard";

export const Route = createFileRoute("/_protected/")({
  component: Home,
});

function Home() {
  return (
    <div className="">
      <Dashboard/>
    </div>
  );
};
