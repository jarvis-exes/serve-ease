import type { QueryClient } from '@tanstack/react-query';
import type { AuthUserType } from './auth.model';

export type ContextType = {
  queryClient: QueryClient;
  authUser: AuthUserType;
}