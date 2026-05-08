"use client";
import Image from "next/image";
import Onboard from "../../../public/onboard.png";
import {
  FaCanadianMapleLeaf,
  FaCircleCheck,
  FaUserGear,
  FaUserTie,
} from "react-icons/fa6";
import { MdEngineering, MdOutlineSecurity } from "react-icons/md";
import { IoIosArrowRoundForward, IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { GiChestnutLeaf } from "react-icons/gi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PiPottedPlantBold } from "react-icons/pi";

export default function Page() {
  const arr = [
    {
      name: "Farm Manager",
      desc: "Manage farms, fields, crops, tasks, finance and your team",
      feats: [
        "Manage farms & fields",
        "Track crops & tasks",
        "Finance & expene management",
        "Reports & analytics",
        "Manage team & workers",
      ],
      id: "owner",
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      icon: FaUserTie,
      color: "text-[#2d8952]",
      border: "border-[#2d8952]",
      hover: "hover:border-[#2d8952]",
    },
    {
      name: "Worker",
      desc: "View assigned tasks and update daily activties",
      feats: [
        "View assigned tasks",
        "Log work & updates",
        "Update photos & notes",
        "Track daily activites",
      ],
      id: "worker",
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      icon: MdEngineering,
      color: "text-[#de852c]",
      border: "border-[#de852c]",
      hover: "hover:border-[#de852c]",
    },
    {
      name: "Admin",
      desc: "Manage users, farms, and system configuration",
      feats: [
        "Manage users",
        "Manage farms",
        "System settings",
        "Subscriptions & billings",
      ],
      id: "admin",
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      icon: FaUserGear,
      color: "text-[#1058d6]",
      border: "border-[#1058d6]",
      hover: "hover:border-[#1058d6]",
    },
  ];

  const managements = [
    {
      icon: <GiChestnutLeaf />,
      text: "All-in-one Farm Management",
    },
    {
      icon: <LuChartNoAxesCombined />,
      text: "Real-time Insights & Reports",
    },
    {
      icon: <MdOutlineSecurity />,
      text: "Secure & Reliable",
    },
  ];
  const [select, setSelect] = useState<string | null>(null);
  const router = useRouter();
  return (
    <div className="size-full gap-6 grid grid-cols-1 xl:grid-cols-[0.65fr_1fr] bg-white relative  md:h-screen   items-center">
      <div className="relative h-[600px] sm:h-[500px] xl:h-full aspect-auto">
        <div className="absolute size-full  bg-black/25 z-10" />
        <Image
          src={Onboard}
          alt="onboard"
          placeholder="blur"
          className="object-center   object-cover"
          fill
        />

        <div className="z-20 p-6 flex flex-col justify-between absolute h-full w-full">
          <div className="flex justify-start items-center w-full  gap-2">
            <div className="bg-primary-green size-8 flex items-center justify-center rounded-full">
              <PiPottedPlantBold className="text-white text-xl" />
            </div>
            <p className="text-sm font-medium text-white">
              Smart Farm Management System
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-semibold">
              Let&apos;s grow <br />
              <span className="text-[#9ed457]">smarter, together.</span>
            </h2>
            <p className="text-sm sm:text-base text-white max-w-full sm:max-w-[350px] font-normal">
              S.F.M.S helps you manage your farm, people and finances
              efficiently - all in one place.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 ">
            {managements.map((b) => (
              <div
                key={b.text}
                className="text-white p-4 mx-auto max-w-[220px] w-full gap-2  border border-white/10 flex items-center flex-col justify-center backdrop-blur-sm rounded-md"
              >
                <div className="text-3xl">{b.icon}</div>
                <p className="text-center text-sm">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" ">
        <div className="mx-auto max-w-[90%]">
          <div className="space-y-2">
            <h4 className="text-2xl text-dark font-semibold">
              Choose your role
            </h4>
            <p className="text-zinc-500 text-base font-normal">
              Select the role that best describes you to get started
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 md:grid-cols-3 gap-4 mt-6">
            {arr.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  onClick={() => setSelect(a.id)}
                  key={a.id}
                  className={`size-full md:last:col-span-1 sm:last:col-span-2 p-4 gap-4 bg-white pt-4 relative rounded-xl  border hover:border-2 hover:shadow-sm ${a.hover} transition-all duration-300 cursor-pointer flex flex-col ${select === a.id ? `${a.border} border-2` : "border-border/80 "}  `}
                >
                  {select === a.id && (
                    <FaCircleCheck
                      className={`text-lg ${a.color} absolute top-2 self-end`}
                    />
                  )}
                  <div className="grid grid-cols-[0.1fr_1fr] sm:flex  flex-col gap-4 sm:gap-2 items-start sm:items-center justify-between sm:justify-center ">
                    <div
                      className={`${a.iconColor} size-10 sm:size-16 text-xl sm:text-2xl flex items-center justify-center rounded-full`}
                    >
                      <Icon />
                    </div>
                    <div className="flex flex-col gap-0.5 sm:gap-2">
                      <h6
                        className={`${a.color} sm:text-center text-lg font-medium`}
                      >
                        {a.name}
                      </h6>
                      <p className="text-zinc-500 sm:text-center text-sm font-normal">
                        {a.desc}
                      </p>
                    </div>
                  </div>

                  <div className="sm:flex gap-2 hidden justify-start flex-col">
                    {a.feats.map((f) => (
                      <div className="flex items-center gap-2" key={f}>
                        <IoMdCheckmark className={`${a.color}`} />
                        <p className="text-zinc-500  text-sm font-normal">
                          {f}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full items-center mt-8 gap-2.5 flex flex-col">
            <Button
              disabled={!select}
              className="bg-primary-green w-full h-10 cursor-pointer "
            >
              <Link
                className="w-full flex justify-center items-center gap-4"
                href={`/${select}/login`}
              >
                Continue <IoIosArrowRoundForward />
              </Link>
            </Button>
            <p className="text-zinc-500 text-center pb-5 text-sm">
              By continuing you agree to our{" "}
              <span className="text-primary-green font-medium">
                Terms of Use
              </span>{" "}
              and{" "}
              <span className="text-primary-green font-medium">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
