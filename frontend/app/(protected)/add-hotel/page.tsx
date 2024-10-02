"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import * as apiClient from "@/utils/api-client";

export type AddHotelFormData = {
  name: string;
  location: string;
};

export default function AddHotel() {
  const { mutate } = useMutation({
    mutationFn: apiClient.addHotel,
    onSuccess: () => {
      console.log("Success");
    },
    onError: () => {
      console.log("Error");
    },
  });

  const handleSave = () => {
    mutate({ name: "Hotel Shonarga", location: "Dhaka, Bangladesh" });
  };
  return (
    <div>
      <form onSubmit={handleSave}>
        <input type="text" className="border" />
        <input type="text" className="border" />
        <button>Save</button>
      </form>

      <button onClick={() => handleSave()}>Click me</button>
    </div>
  );
}
