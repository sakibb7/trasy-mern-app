"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import * as apiClient from "@/utils/api-client";
import { FormProvider, useForm } from "react-hook-form";

export type AddHotelFormData = {
  name: string;
  location: string;
  imageFiles: FileList;
};

export default function AddHotel() {
  const formMethods = useForm<AddHotelFormData>();
  const { handleSubmit, register } = formMethods;
  const { mutate } = useMutation({
    mutationFn: apiClient.addHotel,
    onSuccess: () => {
      console.log("Success");
    },
    onError: () => {
      console.log("Error");
    },
  });

  // const handleSave = (formData: AddHotelFormData) => {
  //   mutate({ name: "Hotel Shonarga", location: "Dhaka, Bangladesh" });
  // };

  const onSubmit = handleSubmit((formDataJson: AddHotelFormData) => {
    console.log(formDataJson);
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("location", formDataJson.location);

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    console.log(formData);

    mutate(formData);
  });

  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="border"
            {...register("name", {
              required: "This field is required",
            })}
          />
          <input
            type="text"
            className="border"
            {...register("location", {
              required: "This field is required",
            })}
          />
          <input
            accept="image/*"
            type="file"
            multiple
            {...register("imageFiles")}
          />
          <button type="submit">Save</button>
        </form>
      </FormProvider>

      {/* <button onClick={() => handleSave()}>Click me</button> */}
    </div>
  );
}
