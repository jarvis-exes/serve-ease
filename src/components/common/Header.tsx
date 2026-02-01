import { useLogout } from "@/routes/auth/-auth-hooks";
import Button from "./Button";
import { RiLogoutBoxLine } from "react-icons/ri";

const Header = () => {
  const { mutateAsync: logout } = useLogout();
  return (
    <div className="flex bg-green-medium h-16 justify-between px-4 py-2 items-center">
      <div className="text-2xl font-bold text-white">Serve Ease</div>
      <div>
        <Button onClick={() => logout()} icon={<RiLogoutBoxLine />}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;