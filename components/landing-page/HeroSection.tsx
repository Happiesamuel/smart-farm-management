"use client";
import Image from "next/image";
import bg from "../../public/hero-bg.png";
import Photo from "../../public/newshot-2.png";
import { LiaCanadianMapleLeaf } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Users, Leaf, Map, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useLandingStats } from "@/hooks/analytics/useAnalytics";
import { NoResult } from "../loader/GeneralLoader";
const arr = ["Easy to Use", "Secure & Reliable", "All-in-One Solution"];

export default function HeroSection() {
  return (
    <section
      id="home"
      style={{ backgroundImage: `url(${bg.src})` }}
      className="relative h-full w-full bg-cover bg-center pb-8 lg:pb-20 pt-32 lg:pt-40 "
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-white/80" />

      <div data-aos="fade-up" data-aos-delay="100" className="relative z-10">
        <div className=" grid grid-cols-1 lg:grid-cols-[0.75fr_1fr] xl:grid-cols-[0.6fr_1fr] gap-5 lg:gap-10 ">
          <div className="space-y-3.5 pl-4 lg:pl-20">
            <div className="gap-3 flex items-center lg:items-start justify-center flex-col pr-4">
              <div className="text-sm bg-[#e8f5ec] w-fit flex items-center justify-center gap-1 text-[#2d8952]  py-0.5 px-2 rounded-md ">
                <LiaCanadianMapleLeaf /> <p>Smart Farming, Better Future</p>
              </div>
              <div className="text-2xl lg:text-3xl xl:text-4xl flex lg:flex-col sm:gap-2 sm:flex-row flex-col  text-dark font-bold">
                <div className="flex gap-1.5">
                  <p>Manage Your Farm</p>{" "}
                  <div className=" flex items-center justify-center text-white text-xl lg:text-3xl">
                    🌿
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="text-primary-green">Smarter,</span>
                  <p>Not Harder</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-center lg:text-justify  xl:text-base text-zinc-600 font-normal pr-4 mx-auto lg:mx-0 md:max-w-[65%] lg:max-w-[90%]">
              Smart Farm Management System helps you manage farms, fields,
              crops, tasks, finances, and your team in one powerful platform.
              Track everything in real-time and grow your productivity
            </p>
            <div>
              <div className="flex lg:justify-start justify-center items-center gap-2">
                <Button className="bg-primary-green w-[48%] h-9 sm:w-fit cursor-pointer text-white rounded-sm">
                  <Link
                    href={"/onboard"}
                    className="flex items-center w-full gap-2"
                  >
                    <p>Get Started Free</p>
                    <MdOutlineArrowRightAlt />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden sm:flex  items-center justify-between gap-2 pr-4 lg:pr-0 max-w-[80%] lg:max-w-full mx-auto">
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
          </div>
          <div className="w-full pl-4 pr-4 lg:pl-0 lg:pr-10 ">
            <div className="relative aspect-auto w-full h-[200px] sm:h-[400px] md:h-[500px]">
              <Image
                src={Photo}
                fill
                alt="photo"
                className="object-top object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <Stats />
      </div>
    </section>
  );
}

function Stats() {
  const { data, status, error } = useLandingStats();
  const stats = [
    {
      icon: Users,
      value: data?.users?.toLocaleString() ?? "0",
      label: "Active Users",
    },
    {
      icon: Leaf,
      value: data?.farms?.toLocaleString() ?? "0",
      label: "Farms Managed",
    },
    {
      icon: Map,
      value: data?.fields?.toLocaleString() ?? "0",
      label: "Fields Monitored",
    },
    {
      icon: CheckCircle,
      value: data?.tasks?.toLocaleString() ?? "0",
      label: "Tasks Completed",
    },
    {
      icon: ShieldCheck,
      value: data?.workspaces?.toLocaleString() ?? "0",
      label: "Workspaces",
      isWide: true,
    },
  ];
  return (
    <div className="mx-4 lg:absolute left-[0%] right-0 lg:bottom-[-30%] xl:bottom-[-25%] md:max-w-3xl lg:max-w-4xl xl:max-w-6xl md:mx-auto mt-6 lg:mt-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg md:rounded-2xl shadow-md overflow-hidden">
      {status === "pending" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-gray-200">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-8 animate-pulse"
            >
              <div className="size-8 rounded-full bg-gray-200" />

              <div className="space-y-2">
                <div className="h-4 w-12 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="py-8 text-center">
          <NoResult>Unable to load platform statistics</NoResult>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-gray-200">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 px-6 py-8 ${
                  item.isWide ? "flex-1" : "flex-1 justify-center"
                }`}
              >
                <div className="text-green-600">
                  <Icon size={28} />
                </div>

                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {item.value}
                  </p>

                  <p className="text-sm text-gray-500">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
