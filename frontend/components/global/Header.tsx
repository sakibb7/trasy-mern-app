"use client";

import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import userImg from "@/assets/images/user-sample-img.jpg";
import { PiGear, PiHouse, PiSignOut, PiUser } from "react-icons/pi";
import logo from "@/assets/images/icon.png";
import SignOutButton from "../buttons/SignOutButton";
import useAuth from "@/hooks/useAuth";

export default function Header() {
  const [showRegionModal, setShowRegionModal] = useState(false);
  const { modalRef, modal, setModal } = useClickOutside();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <header className=" py-4">
      <div className="container flex justify-between items-center ">
        <div className="flex justify-start items-center">
          <Image src={logo} alt="" className="size-10" />
          <Link href={"/"} className="text-xl font-semibold  ">
            Trasy
          </Link>
        </div>

        <div className="flex justify-end items-center gap-4">
          <div className="flex justify-center items-center gap-4">
            <div className=" relative">
              <div
                onClick={() => setShowRegionModal((prev) => !prev)}
                className="flex justify-start items-center gap-0.5 relative cursor-pointer"
              >
                <span className="pl-1 text-sm text-slate-700">USD</span>
                <LuChevronDown />
              </div>
              <div
                className={`absolute top-8 right-0 bg-white py-4 flex justify-start items-start shadow-2xl z-20 rounded-md max-h-[180px] overflow-y-auto duration-300 ${
                  showRegionModal
                    ? "translate-y-0 opacity-100 visible"
                    : "translate-y-2 opacity-0 invisible"
                }`}
              >
                <div className=" border-r ">
                  <p className="text-sm font-medium pl-5">Country</p>
                  <ul className="text-sm pt-2">
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      USA
                    </li>
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      UK
                    </li>
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      UAE
                    </li>
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      Aus
                    </li>
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      NZ
                    </li>
                    <li className="py-1 pr-20 pl-5 hover:bg-slate-100 duration-300">
                      Ger
                    </li>
                  </ul>
                </div>
                <div className=" ">
                  <p className="text-sm font-medium pl-5">Region</p>
                  <ul className="text-sm pt-2">
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      USD
                    </li>
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      UKD
                    </li>
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      UAE
                    </li>
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      Aus
                    </li>
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      NZ
                    </li>
                    <li className="py-1 pr-16 pl-5 hover:bg-slate-100 duration-300">
                      Ger
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {user ? (
            <>
              <div className="relative">
                <div
                  className=""
                  onClick={() => setModal((prev) => !prev)}
                  ref={modalRef}
                >
                  <Image
                    src={userImg}
                    alt=""
                    className="size-10 rounded-full object-cover cursor-pointer"
                  />
                </div>

                <div
                  className={`absolute top-12 right-0 bg-white flex justify-start items-start box-shadow-1 border border-slate-100 z-20 rounded-md duration-300 text-sm ${
                    modal
                      ? "translate-y-0 opacity-100 visible"
                      : "translate-y-2 opacity-0 invisible"
                  }`}
                >
                  <ul className="flex flex-col">
                    <li className="">
                      <Link
                        href={"/my-profile"}
                        className="px-6 py-2 text-nowrap flex justify-start items-center gap-2 hover:bg-sky-50 duration-300"
                      >
                        <PiUser /> Profile
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        href={"/my-hotels"}
                        className="px-6 py-2 text-nowrap flex justify-start items-center gap-2 hover:bg-sky-50 duration-300"
                      >
                        <PiHouse /> My Hotels
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        href={"/my-hotels"}
                        className="px-6 py-2 text-nowrap flex justify-start items-center gap-2 hover:bg-sky-50 duration-300"
                      >
                        <PiGear /> Settings
                      </Link>
                    </li>
                    <li className="px-6 py-2 flex justify-start items-center gap-2 hover:bg-sky-50 duration-300">
                      <PiSignOut />
                      <SignOutButton />
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-end items-center gap-3">
              <Link
                href={"/sign-in"}
                className="text-slate-700 border border-slate-700 py-1 px-3 rounded-md hover:bg-slate-700 hover:text-white duration-300 text-sm"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
