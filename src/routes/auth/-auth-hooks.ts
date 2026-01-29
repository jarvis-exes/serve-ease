import type { AuthUserType, LoginFormType } from "@/models";
import { Routes } from "@/models/routes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router";
import axios from "axios"
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: 'https://serve-ease-l1i2.onrender.com',
    withCredentials: true
})

export const useLogin = () => {
 
    return useMutation({
        mutationFn: async (payload: LoginFormType) => {
            const { data } = await api.post(`${Routes.AUTH}${Routes.LOGIN}`, payload);
            return data;
        },
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.accessToken);
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async () => {
            await api.post(`${Routes.AUTH}${Routes.LOGOUT}`)
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['accessToken', 'currentUser'] });
            navigate({ to: `${Routes.AUTH}${Routes.LOGIN}` });
        }
    })
}

export const getAuthUser = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    const decoded = jwtDecode<AuthUserType>(token);

    if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("accessToken");
        return null;
    }

    return decoded;
}