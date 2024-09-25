import { useQuery } from "@tanstack/react-query";
import * as apiClient from "@/utils/api-client";
import useUserStore from "@/stores/auth";
import { useEffect } from "react";

export const useFetchUser = () => {
  const { setIsAuthenticated, setUserData } = useUserStore();

  const {
    isError,
    isLoading,
    data: userData,
  } = useQuery({
    queryKey: ["get-user"],
    queryFn: apiClient.getUser,
  });

  console.log(`Error:`, isError);

  useEffect(() => {
    if (!isError) {
      setIsAuthenticated();
    }
    if (userData) {
      setUserData(userData);
    }
  }, []);

  return { isError, isLoading, userData };
};
