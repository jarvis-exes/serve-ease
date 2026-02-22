import {io} from "socket.io-client";
import { getTokens } from "./utils/tokens";

const {accessToken} = getTokens();

export const socket = io("https://serve-ease-l1i2.onrender.com",{
    autoConnect: true,
    auth: {
        token: accessToken
    }
})