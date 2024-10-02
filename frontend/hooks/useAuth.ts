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
  const { data: user, ...rest } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...opts,
  });
  return {
    user,
    ...rest,
  };
};

export default useAuth;
