import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import * as apiClient from "@/utils/api-client";
import { User } from "@/stores/auth";

export const useFetchUser = () => {
  const queryOptions: UseQueryOptions<User, Error> = {
    queryKey: ["get-user"],
    queryFn: apiClient.getUser,
    retry: false,
  };

  const {
    isError,
    isLoading,
    data: userData,
  } = useQuery<User, Error>(queryOptions);

  return { isError, isLoading, userData };
};
