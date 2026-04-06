import MenuBar from "./MenuBar"
import { menuItems } from "./constants"
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "@tanstack/react-router";
import Button from "../common/Button";
import { useLogout } from "@/routes/auth/-auth-hooks";
import { useIsKitchen } from "@/utils/utils";


const Menu = () => {
  const { mutateAsync: logout } = useLogout();
  const isKitchen = useIsKitchen();

  return (
    <div className="flex shrink-0 h-16 justify-between px-4 py-2 items-center">
      <Link to='/' className="flex items-center gap-4 h-full">
        <img src='/cutlery.png' alt="" className="h-full" />
        <span className="text-2xl font-bold">Serve Ease</span>
      </Link>

      {!isKitchen && <MenuBar items={menuItems} />}

      <Button className="bg-gray-300" onClick={() => logout()} icon={<RiLogoutBoxLine />}>
        Logout
      </Button>

    </div>
  )
}

export default Menu