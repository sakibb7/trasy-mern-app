"use client";
import { useFetchUser } from "@/hooks/useFetchUser";
import useUserStore from "@/stores/auth";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUserStore();
  const { isLoading } = useFetchUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    redirect("/sign-in");
    return null;
  }
  return <div>{children}</div>;
}
