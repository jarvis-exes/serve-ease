import { api } from "@/api/api"
import type { CompleteMenuResponseType } from "@/models/menu.model"
import { Routes } from "@/models/routes"
import { useQuery } from "@tanstack/react-query"

export const useGetMenu = (outletId: string)=>{
    return useQuery<CompleteMenuResponseType, Error>({
        queryKey: ['all-items'],
        queryFn: async ()=>{
            const response = await api.get(`${Routes.HOME}${Routes.MENU}/${outletId}`);
            return response.data;
        },
        enabled: !!outletId
    })
}