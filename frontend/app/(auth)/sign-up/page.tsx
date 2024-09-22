"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import * as apiClient from "@/utils/api-client";
import Image from "next/image";
import signInBg from "@/assets/images/sign-in-img.jpg";
import logo from "@/assets/images/icon.png";
import Link from "next/link";

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
    <div className=" h-screen overflow-hidden relative">
      <Image src={signInBg} alt="" />
      <div className="absolute inset-0 flex justify-center items-center">
        <div className=" flex justify-center items-start flex-col p-12 rounded-xl bg-white w-[500px]">
          <div className="flex justify-start items-center">
            <Image src={logo} alt="" className="size-10" />
            <Link href={"/"} className="text-xl font-semibold  ">
              Bookingly
            </Link>
          </div>
          <p className="text-3xl font-bold text-slate-700 text-start pt-4">
            {" "}
            Create an account
          </p>
          <p className="text-sm text-slate-700 pt-1">
            Already a member?{" "}
            <Link href={"/sign-in"} className="text-p1 underline">
              Sign in
            </Link>
          </p>

          <form onSubmit={onSubmit} className="pt-6 flex flex-col gap-4 w-full">
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
      </div>
    </div>
  );
}
