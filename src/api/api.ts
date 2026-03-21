import { getTokens } from "@/utils/tokens";
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        const accessToken = getTokens();

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error)=> Promise.reject(error)
);