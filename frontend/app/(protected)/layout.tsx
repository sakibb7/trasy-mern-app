"use client";

import useUserStore from "@/stores/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isCheckingAuth, checkAuthentication } =
    useUserStore();

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (isCheckingAuth) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    redirect("/sign-in");
    return null;
  }
  return <div>{children}</div>;
}
