import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import type { LoginFormType } from "@/models";
import { getAuthUser } from "@/utils/tokens";
import { useLogin } from "./-auth-hooks";
import Loader from "@/components/loaders/Loader";

function Login() {
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const { mutateAsync: login, isPending, isError } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-dvh w-full flex justify-center items-center bg-login bg-cover">
      <Card
        className="w-96 m-10 min-h-96 p-10 text-black flex flex-col"
        color="transparent"
      >
        <h1 className="text-center text-white text-3xl mb-10">
          Hi! Welcome back
        </h1>
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col min-h-60 h-full items-center gap-5"
        >
          <Input
            name="email"
            placeholder="Email"
            type="email"
            required
            onChange={handleChange}
            disabled={isPending}
          />

          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
            onChange={handleChange}
            disabled={isPending}
          />

          {isError && (
            <div className="text-red-500 font-bold">
              Lagta hai password galat hai!
            </div>
          )}

          <div className="h-full flex flex-col m-auto">
            {isPending ? (
              <Loader type="tarbooj" />
            ) : (
              <Button
                disabled={isPending}
                classes="text-xl px-6 py-4 rounded-3xl"
              >
                Login
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/auth/login")({
  component: Login,
  beforeLoad: async () => {
    const authUser = getAuthUser();
    if (authUser) throw redirect({ to: "/" });
  },
});
