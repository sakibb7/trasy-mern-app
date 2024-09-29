import { useRouter } from "next/navigation";
import useUserStore from "@/stores/auth";

function SignOutButton() {
  const { logout } = useUserStore();

  const router = useRouter();

  const handleClick = async () => {
    try {
      await logout();
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={handleClick} className=" cursor-pointer">
      Sign Out
    </div>
  );
}

export default SignOutButton;
