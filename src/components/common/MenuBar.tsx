import type { FC } from "react";
import { Link } from "@tanstack/react-router";
import { getUser } from "@/utils/tokens";
import { Roles } from "@/models/roles.enum";

type MenuBarProps = {
  items: MenuItem[];
};
const MenuBar: FC<MenuBarProps> = ({ items }) => {
  const user = getUser();
  const isKitchen = user?.role === Roles.KITCHEN;
  if (isKitchen) items = items.filter(item => item.name === 'Kitchen')

  return (
    <div className="flex gap-15 font-semibold">
      {items.map((item, idx) => {
        return (
          <Link
            key={idx}
            to={item.link}
            className="underline-animate "
            activeProps={{
              className: "after:w-full",
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
