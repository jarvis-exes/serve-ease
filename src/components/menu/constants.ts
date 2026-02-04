import { Routes } from "@/models/routes";

export const menuItems: MenuItem[] = [
    {
        name: 'Home',
        link: Routes.HOME
    },
    {
        name: 'Dashboard',
        link: Routes.DASHBOARD
    },
    {
        name: 'Menu',
        link: Routes.MENU
    },
    {
        name: 'Edit Menu',
        link: `${Routes.MENU}/${Routes.EDIT}`
    },
]
