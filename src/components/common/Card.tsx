import { twMerge } from "tailwind-merge";

type CardProps = {
  children: React.ReactNode;
  color?: "transparent" | "white";
  classes?: string;
};

const style = {
  transparent: "backdrop-blur-xl",
  white: "bg-white",
};

const Card: React.FC<CardProps> = ({ children, color = "white", classes }) => {
  return (
    <div className={twMerge("p-2 shadow-xl rounded-2xl", style[color], classes)}>
      {children}
    </div>
  );
};

export default Card;
