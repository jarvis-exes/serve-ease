import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { getUser } from "@/utils/tokens";
import { Roles } from "@/enums/roles.enum";

type MenuBarProps = {
  items: MenuItem[];
};
const MenuBar: FC<MenuBarProps> = ({ items }) => {
  const user = getUser();
  const isKitchen = user?.role === Roles.KITCHEN;
  if (isKitchen) items = items.filter(item => item.name === 'Kitchen')

  return (
    <div className="flex gap-5 font-semibold">
      {items.map((item, idx) => {
        return (
          <Link
            key={idx}
            to={item.link}
            className=" px-3 py-2 rounded-full bg-gray-300 text-gray-700"
            activeProps={{
              className: "bg-gray-900 text-white",
            }}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default MenuBar;
