import Image from "next/image";
import Link from "next/link";
import React from "react";
import heroImg from "@/assets/images/hero_img.jpg";
import { PiPlayFill } from "react-icons/pi";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-4 pb-30">
      <section className=" container flex justify-between items-center gap-8">
        <div className="w-1/2">
          <h1 className="text-6xl font-bold text-slate-800">
            <span className="text-p1">Best Holiday</span> Starts From Here
          </h1>
          <p className=" font-medium pt-3 text-slate-500">
            Planning for a trip? We will organize your trip with the best places
            and within best budget!
          </p>

          <div className="flex justify-start items-center gap-4 pt-6">
            <Link
              href={"/all-hotels"}
              className="text-p1 py-2 px-3 rounded-md font-medium bg-sky-50"
            >
              Discover Now
            </Link>
            <div className="flex justify-start items-center gap-2 text-sm font-medium text-slate-700">
              <div className="relative">
                {" "}
                <Image
                  src={heroImg}
                  alt=""
                  className="size-9 rounded-full object-cover"
                />{" "}
                <PiPlayFill className="absolute top-2 left-2 text-xl text-white" />
              </div>
              <span>Watch Our Story</span>
            </div>
          </div>

          {/* <div className="mt-32">
            <SearchBar />
          </div> */}
        </div>
        <div className="">
          <Image src={heroImg} alt="" className="rounded-xl max-w-[550px]" />
        </div>
      </section>
    </section>
  );
}
