import type { LoginFormType } from "@/models";
import { Routes } from "@/models/routes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router";
import axios from "axios"

const api = axios.create({
    baseURL: 'https://serve-ease-l1i2.onrender.com',
    withCredentials: true
})

export const authQueryOptions = {
    queryKey: [Routes.AUTH],
    queryFn: async () => {
        const { data } = await api.get(`${Routes.AUTH}${Routes.USER}`);
        return data;
    },
    retry: false,
    staleTime: 6 * 5 * 1000
}

export const useAuth = () => {
    return useQuery(authQueryOptions);
}

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: LoginFormType) => {
            await api.post(`${Routes.AUTH}${Routes.LOGIN}`, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Routes.AUTH] });
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
            queryClient.removeQueries({ queryKey: [Routes.AUTH] });
            navigate({ to: `${Routes.AUTH}${Routes.LOGIN}` });
        }
    })
}