import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-dvh w-full flex justify-center items-center bg-login bg-cover">
      <Card classes="w-96 m-10 p-5 text-black" color="transparent">
        <h1 className="text-center text-white text-4xl mb-5">Login</h1>
        <form action="" className="flex flex-col items-center h-full gap-5 p-5">
          
            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            
            <Button>
              Login
            </Button>
          
        </form>
      </Card>
    </div>
  );
}
