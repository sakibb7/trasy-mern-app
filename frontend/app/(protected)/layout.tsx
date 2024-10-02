"use client";

import useAuth from "@/hooks/useAuth";
// import useUserStore from "@/stores/auth";
import API from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
// import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  // const { isAuthenticated, isCheckingAuth, checkAuthentication } =
  //   useUserStore();

  // useEffect(() => {
  //   checkAuthentication();
  // }, []);

  // if (isCheckingAuth) {
  //   return <p>Loading...</p>;
  // }

  // if (!isAuthenticated) {
  //   redirect("/sign-in");
  //   return null;
  // }

  console.log(user);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (!user) {
    redirect("/sign-in");
    return null;
  }

  return <div>{children}</div>;
}
