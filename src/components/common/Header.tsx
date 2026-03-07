import { useLogout } from "@/routes/auth/-auth-hooks";
import Button from "./Button";
import { RiLogoutBoxLine } from "react-icons/ri";
import Menu from "../menu/Menu";
import { Link } from "@tanstack/react-router";

const Header = () => {
  const { mutateAsync: logout } = useLogout();
  return (
    <div className="flex shrink-0 bg-green-medium h-16 justify-between px-4 py-2 items-center">
      <Link to='/' className="flex items-center gap-4 h-full">
        <img src='/cutlery.png' alt="" className="h-full"/>
        <span className="text-2xl font-bold text-white">Serve Ease</span>
      </Link>
      <div className="">
        <Menu/>
      </div>
      <div>
        <Button onClick={() => logout()} icon={<RiLogoutBoxLine />}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;