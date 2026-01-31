
import { useLogout } from "@/routes/auth/-auth-hooks";
import Button from "./Button";

const Header = () => {
    const {mutateAsync: logout} = useLogout();
  return (
    <div className="flex bg-green-medium h-16 justify-between p-2 items-center">
      <div className="text-2xl">Serve Ease</div>
      <div>
        <Button onClick={()=>logout()} >Logout</Button>
      </div>
    </div>
  );
};

export default Header;
