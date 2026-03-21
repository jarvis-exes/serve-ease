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
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  return user;
};

export const getOutletId = () => {
  const user = getUser();
  const outletId = user.outlets[0];
  return outletId;
};
