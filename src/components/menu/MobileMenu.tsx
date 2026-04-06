import { BsGridFill } from "react-icons/bs";
import { Link } from "@tanstack/react-router"
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { menuItems } from "./constants";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useLogout } from "@/routes/auth/-auth-hooks";

const MobileMenu = () => {
    const { mutateAsync: logout } = useLogout();

    return (
        <Dropdown.Root>
            <Dropdown.Trigger asChild>
                <BsGridFill size={32} className="text-green-medium" />
            </Dropdown.Trigger>
            <Dropdown.Portal>
                <Dropdown.Content 
                sideOffset={10} align="end" 
                className="flex flex-col gap-3 min-w-48 bg-gray-900 rounded-2xl px-4 py-3 text-2xl text-white data-[state='open']:animate-pop-in data-[state='closed']:animate-pop-out "
                >
                    {menuItems.map((item, idx) => {
                        return (
                            <Dropdown.Item>
                                <Link
                                    key={idx}
                                    to={item.link}
                                    className="flex items-center gap-3"
                                    activeProps={
                                        {className: 'text-green-medium'}
                                    }
                                >
                                    <item.icon />
                                    {item.name}
                                </Link>
                            </Dropdown.Item>
                        );
                    })}
                    <Dropdown.Separator className="h-px bg-slate-600" />
                    <Dropdown.Item onClick={() => logout()} className="flex items-center gap-3">
                        <RiLogoutBoxLine className="text-green-medium"/>
                        <span>Logout</span>
                    </Dropdown.Item>
                </Dropdown.Content>
            </Dropdown.Portal>
        </Dropdown.Root>
    )
}

export default MobileMenu