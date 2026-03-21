import { api } from "@/api/api";
import type { LoginFormType } from "@/models";
import { Routes } from "@/models/routes"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (payload: LoginFormType) => {
            const { data } = await api.post(`${Routes.AUTH}${Routes.LOGIN}`, payload);
            return data;
        },
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate({ to: `/` });
        }
    })
}

export const useLogout = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async () => {
            await api.post(`${Routes.AUTH}${Routes.LOGOUT}`)
        },
        onSuccess: () => {
            localStorage.removeItem('accessToken')
            navigate({ to: `${Routes.AUTH}${Routes.LOGIN}` });
        }
    })
}

