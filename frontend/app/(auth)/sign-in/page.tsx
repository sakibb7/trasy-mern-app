"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "@/utils/api-client";
import Link from "next/link";
import signInBg from "@/assets/images/sign-in-img.jpg";
import logo from "@/assets/images/icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type SignInFormData = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["validate-token"] });

      console.log(`Sing In Successfull`);
      router.push("/");
    },
    onError: (error: Error) => {
      console.log(error);
    },
  });

  const onSubmit = handleSubmit((data: SignInFormData) => {
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
            Welcome back
          </p>
          <p className="text-sm text-slate-700 pt-1">
            New here?{" "}
            <Link href={"/sign-up"} className="text-p1 underline">
              Create an acount
            </Link>
          </p>
          <form onSubmit={onSubmit} className="pt-6 flex flex-col gap-4 w-full">
            <label className="w-full text-slate-500 text-sm">
              Enter email
              <div className="border border-slate-300 rounded-md p-2 mt-1">
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className=" outline-none bg-transparent text-gray-700 w-full"
                  {...register("email", {
                    required: "This field is required",
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </label>
            <label className="w-full text-slate-500 text-sm">
              Password
              <div className="border border-slate-300 rounded-md p-2 mt-1">
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

            <div className="pt-2">
              <button
                type="submit"
                className="text-white bg-green-300 px-6 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
