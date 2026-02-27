import { twMerge } from "tailwind-merge";

type CardProps = {
  children: React.ReactNode;
  color?: "transparent" | "white";
  className?: string;
};

const style = {
  transparent: "backdrop-blur-xl",
  white: "bg-white",
};

const Card: React.FC<CardProps> = ({ children, color = "white", className }) => {
  return (
    <div className={twMerge("p-2 shadow-xl rounded-2xl", style[color], className)}>
      {children}
    </div>
  );
};

export default Card;
