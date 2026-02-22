import type { AuthUserType } from "@/models";
import { jwtDecode } from "jwt-decode";

export const getTokens = () => {
    const accessToken = localStorage.getItem("accessToken");
    return {accessToken};
}

export const getAuthUser = () => {
    const {accessToken} = getTokens();
    if (!accessToken) return null;

    const decoded = jwtDecode<AuthUserType>(accessToken);

    if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("accessToken");
        return null;
    }

    return decoded;
}

export const getOutletId = ()=>{
    return "696656b3646f68216ea092c8";
}

