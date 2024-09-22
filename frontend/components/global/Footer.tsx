import React from "react";
import logo from "@/assets/images/icon.png";
import Image from "next/image";
import Link from "next/link";
import appleStore from "@/assets/images/apple-store.svg";
import playStore from "@/assets/images/play-store.svg";
import {
  PiFacebookLogo,
  PiInstagramLogo,
  PiTwitchLogo,
  PiYoutubeLogo,
} from "react-icons/pi";

export default function Footer() {
  return (
    <div className="bg-slate-900 pt-30 text-white">
      <div className="container grid grid-cols-12 gap-6 pb-30">
        <div className="col-span-4">
          <Link href={"/"} className="flex justify-start items-center gap-2">
            <Image src={logo} alt="" className="size-12" />
            <p className="text-xl font-semibold">Trasy</p>
          </Link>
          <p className="text-sm pt-3 max-w-[300px]">
            Trasy is an online booking company. You can booki hotel, flight,
            tours from this website.
          </p>
        </div>
        <div className="col-span-8 flex justify-between items-start gap-6">
          <div className="">
            <p className="text-xl font-semibold pb-4">Pages</p>
            <ul className="text-sm flex flex-col gap-3">
              <li>
                <Link href={""} className="hover:text-p1 duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-p1 duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-p1 duration-300">
                  News & Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="text-xl font-semibold pb-4">Pages</p>
            <ul className="text-sm flex flex-col gap-3">
              <li>
                <Link href={""} className="hover:text-p1 duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-p1 duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href={""} className="hover:text-p1 duration-300">
                  News & Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <p className="text-xl font-semibold pb-4">Get the app</p>
            <ul className="text-sm flex  gap-3">
              <li>
                <Link href={""} className="">
                  <Image src={appleStore} alt="" />
                </Link>
              </li>
              <li>
                <Link href={""} className="">
                  <Image src={playStore} alt="" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-8 border-t border-slate-700 container flex justify-between items-center">
        <p>© {new Date().getFullYear()} Trasy. All rights reserved.</p>
        <div className="flex justify-start items-center gap-2 text-2xl ">
          <Link href={""} className="hover:text-p1 duration-300">
            <PiFacebookLogo />
          </Link>
          <Link href={""} className="hover:text-p1 duration-300">
            <PiTwitchLogo />
          </Link>
          <Link href={""} className="hover:text-p1 duration-300">
            <PiInstagramLogo />
          </Link>
          <Link href={""} className="hover:text-p1 duration-300">
            <PiYoutubeLogo />
          </Link>
        </div>
      </div>
    </div>
  );
}
