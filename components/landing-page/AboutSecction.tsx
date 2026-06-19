import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { Button } from "../ui/button";
import Photo from "../../public/img-1.png";
import Image from "next/image";
import Link from "next/link";
const arr = [
  "Built for farmers, by developers",
  "Accessible anytime, anywhere",
  "Increase productivity and profit",
  "Make data-driven decision",
];
export default function AboutSecction() {
  return (
    <section
      id="about"
      data-aos="fade-up"
      data-aos-delay="100"
      className="max-w-6xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 px-4 lg:px-20 pt-20 bg-white"
    >
      <div className="space-y-3">
        <p className="text-primary-green text-[13px] pb-2 font-semibold">
          ABOUT US
        </p>
        <h5 className="text-dark font-semibold text-2xl lg:text-4xl">
          Empowering Farmers <br /> with Smart Technology
        </h5>
        <p className="text-zinc-500 text-sm font-normal text-justify lg:max-w-[80%]">
          Smart Farm Management System is designed to simplify farm operations
          using modern technology. Our platform helps farmers to manae their
          farms, track crop growth, manage tasks, control finances and
          collaborate with their team - all in one place
        </p>
        <div className="flex flex-col  gap-2">
          {arr.map((a) => (
            <div
              key={a}
              className="flex items-center gap-2 text-sm text-dark/90 "
            >
              <IoMdCheckmarkCircleOutline className="text-primary-green" />
              <p>{a}</p>
            </div>
          ))}
        </div>
        <Button className="bg-primary-green w-[48%] px-6 h-9 sm:w-fit cursor-pointer text-white rounded-sm">
          <Link href={"/onboard"} className="">
            Get Started
          </Link>
          <MdOutlineArrowRightAlt />
        </Button>
      </div>
      <div className="w-full h-full flex justify-center ">
        <div className="relative aspect-auto size-[300px] sm:size-[400px] md:size-[500px] lg:size-full">
          <Image
            src={Photo}
            fill
            alt="photo"
            className="object-center object-contain  rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
