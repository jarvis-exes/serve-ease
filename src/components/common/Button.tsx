import { type FC, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  color?: "white";
  classes?: string;
};

const colors = {
  white: "bg-white/70 hover:bg-white/50 active:bg-white/70 text-gray-600",
};

const Button: FC<ButtonProps> = ({ children, color = "white", classes }) => {
  return (
    <button
      className={twMerge(
        "w-40 p-4 transition-all rounded-3xl active:scale-105 mt-5 font-bold text-xl",
        colors[color],
        classes
      )}
    >
      {children}
    </button>
  );
};

export default Button;
