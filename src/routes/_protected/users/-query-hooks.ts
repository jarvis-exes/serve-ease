import { api } from "@/api/api";
import { Routes } from "@/models/routes";
import type { CreateKitchenUser } from "@/models/user.model";
import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useCreateKitchenUser = (
  options?: UseMutationOptions<unknown, AxiosError, CreateKitchenUser>,
) => {
  return useMutation<unknown, AxiosError, CreateKitchenUser>({
    mutationFn: async (payload) => {
      const response = await api.post(`${Routes.USERS}${Routes.CREATE_KITCHEN}`, payload);
      return response.data;
    },
    ...options
  });
};
