import { useIsKitchen } from "@/utils/utils";
import { Link, useMatchRoute } from "@tanstack/react-router"
import MobileMenu from "./MobileMenu";
import Button from "../common/Button";
import { useLogout } from "@/routes/auth/-auth-hooks";
import { RiLogoutBoxLine } from "react-icons/ri";

const MobileHeader = () => {
    const isKitchen = useIsKitchen();
    const matchRoute = useMatchRoute();
    const isKitchenOpen = matchRoute({ to: "/kitchen" });
    const { mutateAsync: logout } = useLogout();

    return (
        <div className='flex shrink-0 p-2 items-center justify-between'>
            <Link to='/' className="flex items-center gap-3 h-full">
                <img src='/cutlery.png' alt="" className="h-10" />
                <span className="text-2xl font-bold text-gray-800">Serve Ease</span>
            </Link>

            {isKitchen ?
                <Button onClick={() => logout()} icon={<RiLogoutBoxLine />} className="bg-gray-300">
                    Logout
                </Button> :
                <div className="flex items-center justify-center gap-5">
                    <MobileMenu />
                    <Link
                        to={isKitchenOpen ? '/order' : '/kitchen'}
                        className="px-3 py-2 w-20 text-center rounded-full font-semibold bg-gray-300 text-gray-700"
                    >
                        {isKitchenOpen ? 'Order' : 'Kitchen'}
                    </Link>
                </div>
            }
        </div>
    )
}

export default MobileHeader