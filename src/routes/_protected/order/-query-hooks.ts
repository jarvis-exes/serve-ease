import { api } from "@/api/api";
import type {
  CompleteMenuResponseType,
  CreateOrderType,
} from "@/models/menu.model";
import { Routes } from "@/models/routes";
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useGetMenu = (outletId: string) => {
  return useQuery<CompleteMenuResponseType, Error>({
    queryKey: ["all-items"],
    queryFn: async () => {
      const response = await api.get(
        `${Routes.HOME}${Routes.MENU}/${outletId}`,
      );
      return response.data;
    },
    enabled: !!outletId,
  });
};

export const useCreateOrder = (
  options?: UseMutationOptions<unknown, AxiosError, CreateOrderType>,
) => {
  return useMutation<unknown, AxiosError, CreateOrderType>({
    mutationFn: async (payload) => {
      const response = await api.post(Routes.ORDERS, payload);
      return response.data;
    },
    ...options
  });
};
