import { api } from "@/api/api"
import type { CreateCategoriesRequestType, CreateSubCategoriesRequestType, ListCategoryResponseType, ListMenuItemResponseType, ListSubCategoryResponseType } from "@/models/menu.model"
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

export const useListCategories = (outletId: string) => {
    return useQuery<ListCategoryResponseType[], Error>({
        queryKey: ['categories', outletId],
        queryFn: async () => {
            const response = await api.get(`${Routes.CATEGORIES}/${outletId}`);
            return response.data;
        }
    })
}

export const useListSubCategories = (categoryId: string) => {
    return useQuery<ListSubCategoryResponseType[], Error>({
        queryKey: ['subCategories', categoryId],
        queryFn: async () => {
            const response = await api.get(`${Routes.SUBCATEGORIES}/${categoryId}`);
            return response.data;
        },
        enabled:!!categoryId
    })
}

export const useListItems = (subCategoryId: string) => {
    return useQuery<ListMenuItemResponseType[], Error>({
        queryKey: ['items', subCategoryId],
        queryFn: async () => {
            const response = await api.get(`${Routes.ITEMS}/${subCategoryId}`);
            return response.data;
        },
        enabled:!!subCategoryId
    })
}