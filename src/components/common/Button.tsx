import { type FC, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  color?: "white";
  classes?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const colors = {
  white: "bg-white/70 hover:bg-white/90 active:bg-white/70 text-gray-600 disabled:bg-black/30",
};

const Button: FC<ButtonProps> = ({
  children,
  color = "white",
  classes,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={twMerge(
        "w-40 p-4 transition-all rounded-3xl active:scale-105 font-bold text-xl cursor-pointer disabled:cursor-not-allowed",
        colors[color],
        classes,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
