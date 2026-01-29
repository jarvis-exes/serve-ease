import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { getAuthUser, useLogin } from "../-auth-hooks";
import type { LoginFormType } from "@/models";

function Login() {
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const { mutateAsync: login } = useLogin();

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
      <Card classes="w-96 m-10 p-5 text-black" color="transparent">
        <h1 className="text-center text-white text-3xl mb-5">
          Hi! Welcome back
        </h1>
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col items-center h-full gap-5 p-5"
        >
          <Input
            name="email"
            placeholder="Email"
            type="email"
            required
            onChange={handleChange}
          />

          <Input
            name="password"
            placeholder="Password"
            type="password"
            required
            onChange={handleChange}
          />

          <Button>Login</Button>
        </form>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/auth/login/")({
  component: Login,
  beforeLoad: async () => {
    console.log("authUser: ", getAuthUser());
    const authUser = getAuthUser();
    if (authUser) throw redirect({ to: "/" });
  },
});
