import type { AuthUserType } from "@/models";
import { jwtDecode } from "jwt-decode";

export const getTokens = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

export const decodeToken = () => {
  const accessToken = getTokens();
  if (!accessToken) return null;

  const decoded = jwtDecode<AuthUserType>(accessToken);

  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("accessToken");
    return null;
  }

  return decoded;
};

export const getUser = () => {
  const user =  decodeToken();
  return user;
};

export const getOutletId = () => {
  const user = getUser();
  const outletId = user?.defaultOutlet as string;
  return outletId;
};
