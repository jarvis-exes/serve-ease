import { twMerge } from "tailwind-merge";

type CardProps = {
  children: React.ReactNode;
  color?: "transparent" | "white";
  shadow?: "inner" | "outer" | 'none';
  className?: string;
};

const style = {
  transparent: "backdrop-blur-xl",
  white: "bg-white",
};

const shadowStyle = {
  inner: 'shadow-inner-lg',
  outer: 'shadow-xl',
  none: ''
}

const Card: React.FC<CardProps> = ({ children, color = "white", shadow = "outer", className }) => {
  return (
    <div className={twMerge("p-2 rounded-2xl", style[color], shadowStyle[shadow], className)}>
      {children}
    </div>
  );
};

export default Card;
