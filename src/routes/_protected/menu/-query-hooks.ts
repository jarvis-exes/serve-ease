import { api } from "@/api/api";
import type {
  CreateCategoriesRequestType,
  CreateSubCategoriesRequestType,
  SubCategoryType,
  CategoryType,
  UpdateCategoriesRequestType,
  UpdateSubCategoriesRequestType,
  ItemType,
  CreateItemRequestType,
} from "@/models/menu.model";
import { Routes } from "@/models/routes";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

const outletId = "696656b3646f68216ea092c8";

export const useListCategories = (outletId: string) => {
  return useQuery<CategoryType[], Error>({
    queryKey: ["categories", outletId],
    queryFn: async () => {
      const response = await api.get(`${Routes.CATEGORIES}/${outletId}`);
      return response.data;
    },
  });
};

export const useListSubCategories = (categoryId: string) => {
  return useQuery<SubCategoryType[], Error>({
    queryKey: ["subCategories", categoryId],
    queryFn: async () => {
      const response = await api.get(`${Routes.SUBCATEGORIES}/${categoryId}`);
      return response.data;
    },
    enabled: !!categoryId,
  });
};

export const useListItems = (subCategoryId: string) => {
  return useQuery<ItemType[], Error>({
    queryKey: ["items", subCategoryId],
    queryFn: async () => {
      const response = await api.get(`${Routes.ITEMS}/${subCategoryId}`);
      return response.data;
    },
    enabled: !!subCategoryId,
  });
};

export const useCreateCategory = (
  options?: UseMutationOptions<
    CategoryType,
    AxiosError,
    CreateCategoriesRequestType
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<CategoryType, AxiosError, CreateCategoriesRequestType>({
    mutationFn: async (payload) => {
      const response = await api.post(Routes.CATEGORIES, payload);
      return response.data;
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ["categories", payload.outletId],
      });

      const previousCategories = queryClient.getQueryData([
        "categories",
        payload.outletId,
      ]);

      const optimisticCategory = {
        _id: `temp-${Date.now()}`,
        name: payload.name,
        isActive: true,
        sequence: payload.sequence,
      };

      queryClient.setQueryData(
        ["categories", payload.outletId],
        (old: any[] = []) => [...old, optimisticCategory],
      );

      return { previousCategories, outletId: payload.outletId };
    },

    onError: (context: any) => {
      queryClient.setQueryData(
        ["categories", context?.outletId],
        context?.previousCategories,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", outletId],
      });
    },

    ...options,
  });
};

export const useCreateSubCategory = (
  options?: UseMutationOptions<
    SubCategoryType,
    AxiosError,
    CreateSubCategoriesRequestType
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    SubCategoryType,
    AxiosError,
    CreateSubCategoriesRequestType
  >({
    mutationFn: async (payload) => {
      const response = await api.post(Routes.SUBCATEGORIES, payload);
      return response.data;
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ["subCategories", payload.categoryId],
      });

      const previousSubCategories = queryClient.getQueryData([
        "subCategories",
        payload.categoryId,
      ]);

      const optimisticSubCategory = {
        _id: `temp-${Date.now()}`,
        name: payload.name,
        isActive: true,
        sequence: payload.sequence,
      };

      queryClient.setQueryData(
        ["subCategories", payload.categoryId],
        (old: any[] = []) => [...old, optimisticSubCategory],
      );

      return { previousSubCategories, categoryId: payload.categoryId };
    },

    onError: (context: any) => {
      queryClient.setQueryData(
        ["subCategories", context?.categoryId],
        context?.previousSubCategories,
      );
    },

    onSettled: (variables: any) => {
      queryClient.invalidateQueries({
        queryKey: ["subCategories", variables.categoryId],
      });
    },

    ...options,
  });
};

export const useCreateItem = (
  options?: UseMutationOptions<ItemType, AxiosError, CreateItemRequestType>,
) => {
  const queryClient = useQueryClient();

  return useMutation<ItemType, AxiosError, CreateItemRequestType>({
    mutationFn: async (payload) => {
      const response = await api.post(Routes.ITEMS, payload);
      return response.data;
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ["items", payload.subCategoryId],
      });

      const previousSubCategories = queryClient.getQueryData([
        "items",
        payload.subCategoryId,
      ]);

      const optimisticItem = {
        _id: `temp-${Date.now()}`,
        name: payload.name,
        isActive: payload.isActive,
        sequence: payload.sequence,
        prices: payload.prices,
      };

      queryClient.setQueryData(
        ["items", payload.subCategoryId],
        (old: any[] = []) => [...old, optimisticItem],
      );

      return { previousSubCategories, subCategoryId: payload.subCategoryId };
    },

    onError: (context: any) => {
      queryClient.setQueryData(
        ["items", context?.subCategoryId],
        context?.previousSubCategories,
      );
    },

    onSettled: (variables: any) => {
      queryClient.invalidateQueries({
        queryKey: ["items", variables.subCategoryId],
      });
    },

    ...options,
  });
};

export const useDeleteCategory = (
  options?: UseMutationOptions<CategoryType, AxiosError, string>,
) => {
  const queryClient = useQueryClient();

  return useMutation<CategoryType, AxiosError, string>({
    mutationFn: async (categoryId) => {
      const response = await api.delete(`${Routes.CATEGORIES}/${categoryId}`);
      return response.data;
    },

    onMutate: async (categoryId) => {
      await queryClient.cancelQueries({
        queryKey: ["categories", outletId],
      });

      const previousCategories = queryClient.getQueryData([
        "categories",
        outletId,
      ]);

      queryClient.setQueryData(["categories", outletId], (old: any[]) =>
        old?.filter((cat) => cat._id !== categoryId),
      );

      return { previousCategories };
    },

    onError: (context: any) => {
      queryClient.setQueryData(
        ["categories", outletId],
        context?.previousCategories,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", outletId],
      });
    },

    ...options,
  });
};

export const useDeleteSubCategory = (
  options?: UseMutationOptions<
    SubCategoryType,
    AxiosError,
    { subCategoryId: string; categoryId: string }
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    SubCategoryType,
    AxiosError,
    { subCategoryId: string; categoryId: string }
  >({
    mutationFn: async ({ subCategoryId }) => {
      const response = await api.delete(
        `${Routes.SUBCATEGORIES}/${subCategoryId}`,
      );
      return response.data;
    },

    onMutate: async ({ subCategoryId, categoryId }) => {
      await queryClient.cancelQueries({
        queryKey: ["subCategories", categoryId],
      });

      const previousSubCategories = queryClient.getQueryData([
        "subCategories",
        categoryId,
      ]);

      queryClient.setQueryData(["subCategories", categoryId], (old: any[]) =>
        old?.filter((sub) => sub._id !== subCategoryId),
      );

      return { previousSubCategories, categoryId };
    },

    onError: (context: any) => {
      queryClient.setQueryData(
        ["subCategories", context?.categoryId],
        context?.previousSubCategories,
      );
    },

    onSettled: (variables: any) => {
      queryClient.invalidateQueries({
        queryKey: ["subCategories", variables.categoryId],
      });
    },

    ...options,
  });
};

export const useDeleteItem = (
  options?: UseMutationOptions<
    ItemType,
    AxiosError,
    { itemId: string; subCategoryId: string }
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    ItemType,
    AxiosError,
    { itemId: string; subCategoryId: string }
  >({
    mutationFn: async ({ itemId }) => {
      const response = await api.delete(`${Routes.ITEMS}/${itemId}`);
      return response.data;
    },

    onMutate: async ({ itemId, subCategoryId }) => {
      await queryClient.cancelQueries({
        queryKey: ["items", itemId],
      });

      const previousItems = queryClient.getQueryData(["items", subCategoryId]);

      queryClient.setQueryData(["items", subCategoryId], (old: any[]) =>
        old?.filter((sub) => sub._id !== itemId),
      );

      return { previousItems, subCategoryId };
    },

    onError: (context: any) => {
      queryClient.setQueryData(
        ["items", context?.subCategoryId],
        context?.previousItems,
      );
    },

    onSettled: (variables: any) => {
      queryClient.invalidateQueries({
        queryKey: ["items", variables.subCategoryId],
      });
    },

    ...options,
  });
};

export const useUpdateCategory = (
  options?: UseMutationOptions<
    CategoryType,
    AxiosError,
    Partial<UpdateCategoriesRequestType>
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation<
    CategoryType,
    AxiosError,
    Partial<UpdateCategoriesRequestType>
  >({
    mutationFn: async (payload: Partial<UpdateCategoriesRequestType>) => {
      const response = await api.patch(Routes.CATEGORIES, payload);
      return response.data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ["categories", outletId],
      });

      const previousCategories = queryClient.getQueryData([
        "categories",
        outletId,
      ]);

      queryClient.setQueryData(["categories", outletId], (old: any[]) =>
        old?.map((cat) =>
          cat._id === payload.categoryId ? { ...cat, ...payload } : cat,
        ),
      );

      return { previousCategories };
    },

    onError: (context: any) => {
      queryClient.setQueryData(
        ["categories", outletId],
        context?.previousCategories,
      );
    },

    // onSettled: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["categories", outletId],
    //   });
    // },
    ...options,
  });
};

export const useUpdateSubCategory = (
  options?: UseMutationOptions<
    CategoryType,
    AxiosError,
    { payload: Partial<UpdateSubCategoriesRequestType>; categoryId: string }
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation<
    CategoryType,
    AxiosError,
    { payload: Partial<UpdateSubCategoriesRequestType>; categoryId: string }
  >({
    mutationFn: async ({ payload }) => {
      const response = await api.patch(Routes.SUBCATEGORIES, payload);
      return response.data;
    },
    onMutate: async ({ payload, categoryId }) => {
      await queryClient.cancelQueries({
        queryKey: ["subCategories", categoryId],
      });

      const previousCategories = queryClient.getQueryData([
        "subCategories",
        categoryId,
      ]);

      queryClient.setQueryData(["subCategories", categoryId], (old: any[]) =>
        old?.map((cat) =>
          cat._id === payload.subCategoryId ? { ...cat, ...payload } : cat,
        ),
      );

      return { previousCategories, categoryId };
    },

    onError: (context: any) => {
      queryClient.setQueryData(
        ["subCategories", context?.categoryId],
        context?.previousCategories,
      );
    },

    // onSettled: (variables: any) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["subCategories", variables?.categoryId],
    //   });
    // },
    ...options,
  });
};

export const useUpdateItem = (
  options?: UseMutationOptions<
    CategoryType,
    AxiosError,
    { payload: Partial<ItemType>; subCategoryId: string }
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation<
    CategoryType,
    AxiosError,
    { payload: Partial<ItemType>; subCategoryId: string }
  >({
    mutationFn: async ({ payload }) => {
      const formData = new FormData();

      formData.append("itemId", payload._id || '');
      formData.append("name", payload.name || '');
      formData.append("isActive", String(payload.isActive));
      formData.append("sequence", String(payload.sequence));

      formData.append("prices[FULL]", String(payload.prices?.FULL) || '');
      formData.append("prices[HALF]", String(payload.prices?.HALF) || '');
      formData.append("prices[QUARTER]", String(payload.prices?.QUARTER || ''));

      if (payload.image instanceof File) {
        formData.append("image", payload.image);
      }

      const response = await api.patch(Routes.ITEMS, formData);
      return response.data;
    },
    onMutate: async ({ payload, subCategoryId }) => {
      await queryClient.cancelQueries({
        queryKey: ["items", subCategoryId],
      });

      const previousItems = queryClient.getQueryData(["items", subCategoryId]);

      queryClient.setQueryData(["items", subCategoryId], (old: any[]) =>
        old?.map((cat) =>
          cat._id === payload._id ? { ...cat, ...payload } : cat,
        ),
      );

      return { previousItems, subCategoryId };
    },

    onError: (context: any) => {
      queryClient.setQueryData(
        ["items", context?.subCategoryId],
        context?.previousCategories,
      );
    },

    // onSettled: (variables: any) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["items", variables?.subCategoryId],
    //   });
    // },
    ...options,
  });
};
