import DemoHome from "@/components/common/DemoHome";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex h-full justify-center items-center m-auto gap-30 flex-col md:flex-row">
      <DemoHome/>
    </div>
  );
};
