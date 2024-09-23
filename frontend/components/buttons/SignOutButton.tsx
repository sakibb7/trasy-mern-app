import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as apiClient from "@/utils/api-client";

function SignOutButton() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validate-token"] });
      console.log("Sign Out Successfull");
      router.push("/");
    },
    onError: (error: Error) => {
      console.log(error);
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
