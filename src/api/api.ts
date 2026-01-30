import { getTokens } from "@/utils/tokens";
import axios from "axios";

export const api = axios.create({
    baseURL: 'https://serve-ease-l1i2.onrender.com',
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        const {accessToken} = getTokens();

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error)=> Promise.reject(error)
);