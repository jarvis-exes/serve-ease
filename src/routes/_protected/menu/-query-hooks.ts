import { api } from "@/api/api"
import type {
    CreateCategoriesRequestType,
    CreateSubCategoriesRequestType,
    SubCategoryType,
    CategoryType,
    ListMenuItemResponseType,
    UpdateCategoriesRequestType,
} from "@/models/menu.model"
import { Routes } from "@/models/routes"
import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query"
import type { AxiosError } from "axios"

const outletId = '696656b3646f68216ea092c8';

export const useListCategories = (outletId: string) => {
    return useQuery<CategoryType[], Error>({
        queryKey: ['categories', outletId],
        queryFn: async () => {
            const response = await api.get(`${Routes.CATEGORIES}/${outletId}`);
            return response.data;
        }
    })
}

export const useListSubCategories = (categoryId: string) => {
    return useQuery<SubCategoryType[], Error>({
        queryKey: ['subCategories', categoryId],
        queryFn: async () => {
            const response = await api.get(`${Routes.SUBCATEGORIES}/${categoryId}`);
            return response.data;
        },
        enabled: !!categoryId
    })
}

export const useListItems = (subCategoryId: string) => {
    return useQuery<ListMenuItemResponseType[], Error>({
        queryKey: ['items', subCategoryId],
        queryFn: async () => {
            const response = await api.get(`${Routes.ITEMS}/${subCategoryId}`);
            return response.data;
        },
        enabled: !!subCategoryId
    })
}

export const useCreateCategory = (
    options?: UseMutationOptions<CategoryType, AxiosError, CreateCategoriesRequestType>
) => {
    const queryClient = useQueryClient();

    return useMutation<CategoryType, AxiosError, CreateCategoriesRequestType>({
        mutationFn: async (payload) => {
            const response = await api.post(Routes.CATEGORIES, payload);
            return response.data;
        },

        onMutate: async (payload) => {
            await queryClient.cancelQueries({
                queryKey: ['categories', payload.outletId],
            });

            const previousCategories = queryClient.getQueryData([
                'categories',
                payload.outletId,
            ]);

            const optimisticCategory = {
                _id: `temp-${Date.now()}`,
                name: payload.name,
                isActive: true,
                sequence: payload.sequence,
            };

            queryClient.setQueryData(
                ['categories', payload.outletId],
                (old: any[] = []) => [...old, optimisticCategory]
            );

            return { previousCategories, outletId: payload.outletId };
        },

        onError: (context: any) => {
            queryClient.setQueryData(
                ['categories', context?.outletId],
                context?.previousCategories
            );
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories', outletId],
            });
        },

        ...options,
    });
};


export const useCreateSubCategory = (
    options?: UseMutationOptions<SubCategoryType, AxiosError, CreateSubCategoriesRequestType>
) => {
    const queryClient = useQueryClient();

    return useMutation<SubCategoryType, AxiosError, CreateSubCategoriesRequestType>({
        mutationFn: async (payload) => {
            const response = await api.post(Routes.SUBCATEGORIES, payload);
            return response.data;
        },

        onMutate: async (payload) => {
            await queryClient.cancelQueries({
                queryKey: ['subCategories', payload.categoryId],
            });

            const previousSubCategories = queryClient.getQueryData([
                'subCategories',
                payload.categoryId,
            ]);

            const optimisticSubCategory = {
                _id: `temp-${Date.now()}`,
                name: payload.name,
                isActive: true,
                sequence: payload.sequence,
            };

            queryClient.setQueryData(
                ['subCategories', payload.categoryId],
                (old: any[] = []) => [...old, optimisticSubCategory]
            );

            return { previousSubCategories, categoryId: payload.categoryId };
        },

        onError: (context: any) => {
            queryClient.setQueryData(
                ['subCategories', context?.categoryId],
                context?.previousSubCategories
            );
        },

        onSettled: (variables: any) => {
            queryClient.invalidateQueries({
                queryKey: ['subCategories', variables.categoryId],
            });
        },

        ...options,
    });
};


export const useDeleteCategory = (
    options?: UseMutationOptions<CategoryType, AxiosError, string>
) => {
    const queryClient = useQueryClient();

    return useMutation<CategoryType, AxiosError, string>({
        mutationFn: async (categoryId) => {
            const response = await api.delete(`${Routes.CATEGORIES}/${categoryId}`);
            return response.data;
        },

        onMutate: async (categoryId) => {
            await queryClient.cancelQueries({
                queryKey: ['categories', outletId],
            });

            const previousCategories = queryClient.getQueryData([
                'categories',
                outletId,
            ]);

            queryClient.setQueryData(
                ['categories', outletId],
                (old: any[]) =>
                    old?.filter((cat) => cat._id !== categoryId)
            );

            return { previousCategories };
        },

        onError: (context: any) => {
            queryClient.setQueryData(
                ['categories', outletId],
                context?.previousCategories
            );
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories', outletId],
            });
        },

        ...options,
    });
};


export const useDeleteSubCategory = (
    options?: UseMutationOptions<SubCategoryType, AxiosError, { id: string; categoryId: string }>
) => {
    const queryClient = useQueryClient();

    return useMutation<SubCategoryType, AxiosError, { id: string; categoryId: string }>({
        mutationFn: async ({ id }) => {
            const response = await api.delete(`${Routes.SUBCATEGORIES}/${id}`);
            return response.data;
        },

        onMutate: async ({ id, categoryId }) => {
            await queryClient.cancelQueries({
                queryKey: ['subCategories', categoryId],
            });

            const previousSubCategories = queryClient.getQueryData([
                'subCategories',
                categoryId,
            ]);

            queryClient.setQueryData(
                ['subCategories', categoryId],
                (old: any[]) =>
                    old?.filter((sub) => sub._id !== id)
            );

            return { previousSubCategories, categoryId };
        },

        onError: (context: any) => {
            queryClient.setQueryData(
                ['subCategories', context?.categoryId],
                context?.previousSubCategories
            );
        },

        onSettled: (variables: any) => {
            queryClient.invalidateQueries({
                queryKey: ['subCategories', variables.categoryId],
            });
        },

        ...options,
    });
};


export const useUpdateCategory = (
    options?: UseMutationOptions<CategoryType, AxiosError, Partial<UpdateCategoriesRequestType>>
) => {
    const queryClient = useQueryClient();
    return useMutation<CategoryType, AxiosError, Partial<UpdateCategoriesRequestType>>({
        mutationFn: async (payload: Partial<UpdateCategoriesRequestType>) => {
            const response = await api.patch(Routes.CATEGORIES, payload);
            return response.data;
        },
        onMutate: async (payload) => {
            await queryClient.cancelQueries({
                queryKey: ['categories', outletId],
            });

            const previousCategories = queryClient.getQueryData([
                'categories',
                outletId,
            ]);

            queryClient.setQueryData(
                ['categories', outletId],
                (old: any[]) =>
                    old?.map((cat) =>
                        cat._id === payload.categoryId
                            ? { ...cat, ...payload }
                            : cat
                    )
            );

            return { previousCategories };
        },

        onError: (context: any) => {
            queryClient.setQueryData(
                ['categories', outletId],
                context?.previousCategories
            );
        },

        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories', outletId],
            });
        },
        ...options
    });
};


