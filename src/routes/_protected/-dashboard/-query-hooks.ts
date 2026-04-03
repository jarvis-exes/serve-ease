import { api } from "@/api/api"
import type { DashboardResponse } from "@/models/dashboard.model"
import { Routes } from "@/models/routes"
import { useQuery } from "@tanstack/react-query"

export const useGetDashboardData = () => {
    return useQuery<DashboardResponse, Error>({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const response = await api.get(Routes.HOME);
            return response.data;
        }
    })
}