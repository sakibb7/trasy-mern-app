"use client";
import useUserStore from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "@/utils/api-client";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useUserStore();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: apiClient.removeUser,
    onSuccess: () => {
      router.push("/sign-in");
    },
  });

  const handleDelete = () => {
    mutate();
  };

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      I am the user now
      {user?.email}
      {user?._id}
      {user.firstName}
      {user.lastName}
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}
