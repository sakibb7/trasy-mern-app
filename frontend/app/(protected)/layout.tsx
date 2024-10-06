"use client";

import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (!user) {
    redirect("/sign-in");
    return null;
  }

  return <div>{children}</div>;
}
