import { Roles } from "@/enums/roles.enum";
import { getUser } from "./tokens";

export const useIsKitchen = () => {
    const user = getUser();
    return user?.role === Roles.KITCHEN;
}