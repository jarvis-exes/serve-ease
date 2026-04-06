import { Routes } from "@/models/routes";
import type { MenuItem } from "./type";
import { FaUser } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { GiChefToque } from "react-icons/gi";

export const menuItems: MenuItem[] = [
    {
        name: 'Dashboard',
        link: '/',
        icon: MdOutlineDashboard
    },
    {
        name: 'Order',
        link: Routes.ORDER,
        icon: MdOutlineRestaurantMenu
    },
    {
        name: 'Kitchen',
        link: Routes.KITCHEN,
        icon: GiChefToque
    },
    {
        name: 'Menu',
        link: Routes.MENU,
        icon: BiSolidFoodMenu
    },
    {
        name: 'Users',
        link: Routes.USERS,
        icon: FaUser
    }
    
]
