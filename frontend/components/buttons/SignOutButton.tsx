import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/utils/api";

function SignOutButton() {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      router.push("/sign-in");
    },
  });

  const handleClick = () => {
    signOut();
  };

  return (
    <div onClick={handleClick} className=" cursor-pointer">
      Sign Out
    </div>
  );
}

export default SignOutButton;
