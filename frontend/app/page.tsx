"use client";
import Footer from "@/components/global/Footer";
import Header from "@/components/global/Header";
import HeroSection from "@/components/pages/HomePage/HeroSection";
import { useFetchUser } from "@/hooks/useFetchUser";
import React from "react";

export default function Home() {
  const { isError, isLoading, userData } = useFetchUser();

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (isError) {
    return <div>Error loading user data. Please try again later.</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }
  return (
    <div>
      <Header />
      <HeroSection />

      <div className="py-20">
        {userData ? userData.email : "not logged in"}
        {isLoading}
        {isError}
      </div>
      <Footer />
    </div>
  );
}
