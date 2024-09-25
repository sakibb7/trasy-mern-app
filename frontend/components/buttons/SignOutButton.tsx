import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as apiClient from "@/utils/api-client";
import useUserStore from "@/stores/auth";

function SignOutButton() {
  const queryClient = useQueryClient();
  const { logout } = useUserStore();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["validate-token", "get-user"],
      });
      router.push("/");
      logout();
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <div onClick={handleClick} className=" cursor-pointer">
      Sign Out
    </div>
  );
}

export default SignOutButton;
