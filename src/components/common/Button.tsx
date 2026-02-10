import { type FC, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: ReactNode;
  color?: 'transparent' | 'white';
  classes?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
};

const colors = {
  transparent : "hover:bg-black/10 text-white disabled:text-gray-500",
  white: "bg-white/70 hover:bg-white/90 active:bg-white/70 text-gray-600 disabled:bg-black/30",
};

const Button: FC<ButtonProps> = ({
  children,
  color = 'white',
  classes,
  onClick,
  disabled,
  icon,
}) => {
  return (
    <button
      className={twMerge(
        "px-4 py-2 transition-all rounded-2xl active:scale-105 font-bold text-lg cursor-pointer disabled:cursor-not-allowed",
        colors[color],
        classes,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex gap-2 items-center justify-center">
        {icon}
        {children}
      </div>
    </button>
  );
};

export default Button;
