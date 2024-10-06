import { getUser } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const AUTH = "auth";

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

const useAuth = (opts = {}) => {
  const {
    data: user,
    isLoading,
    status,
    ...rest
  } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    retry: false,
    ...opts,
  });

  console.log(status);

  return {
    user,
    isLoading,
    ...rest,
  };
};

export default useAuth;
