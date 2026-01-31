import Loader from "@/components/loaders/Loader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex items-center m-auto gap-30 flex-col md:flex-row">
      <Loader type="pizza" classes="scale-150"/>
      <Loader type="juice" classes="scale-150"/>
      <Loader type="tarbooj" classes="scale-150"/>
    </div>
  );
};
