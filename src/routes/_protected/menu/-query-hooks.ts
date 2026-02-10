import { api } from "@/api/api"
import type { CreateCategoriesRequestType, CreateSubCategoriesRequestType } from "@/models/menu.model"
import { Routes } from "@/models/routes"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateCategory = () => {
    return useMutation({
        mutationFn: async (payload: CreateCategoriesRequestType) => {
            await api.post(Routes.CATEGORIES, payload);
        }
    })
}

export const useCreateSubCategory = () => {
    return useMutation({
        mutationFn: async (payload: CreateSubCategoriesRequestType) => {
            await api.post(Routes.SUBCATEGORIES, payload);
        }
    })
}

export const useListCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async (outletId: string) => {
            await api.get(Routes.CATEGORIES)
        }
    })
}