import {io} from "socket.io-client";
import { getTokens } from "./utils/tokens";

const {accessToken} = getTokens();

export const socket = io(import.meta.env.VITE_BASE_URL,{
    autoConnect: true,
    auth: {
        token: accessToken
    }
})