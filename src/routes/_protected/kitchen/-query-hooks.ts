import { api } from "@/api/api";
import { Routes } from "@/models/routes";
import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useDeleteOrder = (
  options?: UseMutationOptions<unknown, AxiosError, string>,
) => {
  return useMutation<unknown, AxiosError, string>({
    mutationFn: async (orderId: string) => {
      const response = await api.delete(`${Routes.ORDERS}/${orderId}`);
      return response.data;
    },
    ...options,
  });
};
