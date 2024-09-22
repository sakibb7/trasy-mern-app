import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import * as apiClient from "@/utils/api-client";
import useUserStore, { User } from "@/stores/auth";
import { useEffect } from "react";

export const useFetchUser = () => {
  const { setUser, setLoading, setError } = useUserStore();

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

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setLoading(false);
      setError(false);
    } else if (isError) {
      setUser(null);
      setLoading(false);
      setError(true);
    }
  }, [userData, isError, setUser, setLoading, setError]);

  return { isError, isLoading, userData };
};
