import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import type { MenuItem } from "./type";

type MenuBarProps = {
  items: MenuItem[];
};
const MenuBar: FC<MenuBarProps> = ({ items }) => {
  return (
    <div className="flex gap-5 font-semibold">
      {items.map((item, idx) => {
        return (
          <Link
            key={idx}
            to={item.link}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-300 text-gray-700"
            activeProps={{
              className: "bg-gray-900 text-white",
            }}
          >
            <item.icon />
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default MenuBar;
