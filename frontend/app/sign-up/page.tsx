"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import * as apiClient from "@/utils/api-client";

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { mutate } = useMutation({
    mutationFn: apiClient.signUp,
    onSuccess: async () => {
      console.log("Success");
      await queryClient.invalidateQueries({ queryKey: ["validate-token"] });
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormData) => {
    console.log(data);
    mutate(data);
  });

  return (
    <div className="container pt-10">
      <h2 className="text-center heading-2">Sign Up Page</h2>

      <form onSubmit={onSubmit}>
        <label className="w-full text-slate-500 text-sm">
          Email
          <div className="border border-slate-300 rounded-md p-2">
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full outline-none bg-transparent text-gray-700"
              {...register("email", {
                required: "This email field is required",
              })}
            />
          </div>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className="w-full text-slate-500 text-sm">
          Password
          <div className="border border-slate-300 rounded-md p-2">
            <input
              type="password"
              placeholder="password"
              className="w-full outline-none bg-transparent text-gray-700"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 charectersd",
                },
              })}
            />
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <label className="w-full text-slate-500 text-sm">
          Confirm Password
          <div className="border border-slate-300 rounded-md p-2">
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full outline-none bg-transparent text-gray-700"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This Field is required";
                  } else if (watch("password") !== val) {
                    return "Password doesn't match ";
                  }
                },
              })}
            />
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>

        <div className="pt-2">
          <button
            type="submit"
            className="text-white bg-green-300 px-6 py-2 rounded-md text-sm font-medium"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}
