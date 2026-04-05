import MenuBar from "./MenuBar"
import { menuItems } from "./constants"
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "@tanstack/react-router";
import Button from "../common/Button";
import { useLogout } from "@/routes/auth/-auth-hooks";


const Menu = () => {
  const { mutateAsync: logout } = useLogout();

  return (
    <div className="flex shrink-0 h-16 justify-between px-4 py-2 items-center">
      <Link to='/' className="flex items-center gap-4 h-full">
        <img src='/cutlery.png' alt="" className="h-full" />
        <span className="text-2xl font-bold">Serve Ease</span>
      </Link>

      <MenuBar items={menuItems} />

      <div>
        <Button onClick={() => logout()} icon={<RiLogoutBoxLine />}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Menu