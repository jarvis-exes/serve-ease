import type { FC } from "react";
import { Link } from "@tanstack/react-router";

type MenuBarProps = {
  items: MenuItem[];
};
const MenuBar: FC<MenuBarProps> = ({ items }) => {
  return (
    <div className="flex gap-15 font-semibold">
      {items.map((item) => (
        <Link
          to={item.link}
          className="underline-animate"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuBar;
