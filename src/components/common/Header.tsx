
import { useLogout } from "@/routes/auth/-auth-hooks";
import Button from "./Button";

const Header = () => {
    const {mutateAsync: logout} = useLogout();
  return (
    <div className="flex bg-green-medium justify-between">
      <div className="h-16">Protected Header</div>
      <div>
        <Button onClick={()=>logout()} >Logout</Button>
      </div>
    </div>
  );
};

export default Header;
