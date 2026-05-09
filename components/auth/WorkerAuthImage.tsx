"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AuthImg from "../../public/worker.png";
import { PiPottedPlantBold } from "react-icons/pi";
import { AiOutlineTeam } from "react-icons/ai";
import { CgInsights } from "react-icons/cg";
import { RiTimer2Line } from "react-icons/ri";

const managements = [
  {
    icon: <RiTimer2Line />,
    text: "View and manage your tasks",
  },
  {
    icon: <AiOutlineTeam />,
    text: "Log work and update progress",
  },
  {
    icon: <CgInsights />,
    text: "Stay informed and connected",
  },
];
export default function WorkerAuthImage() {
  const pathname = usePathname();
  const slug = pathname.slice(1);
  return (
    <div className="h-screen items-center  justify-center hidden lg:flex">
      <div className="relative aspect-auto w-full h-full flex items-center justify-center ">
        <Image
          src={AuthImg}
          alt="img"
          placeholder="blur"
          fill
          className="object-center   object-cover"
          quality={100}
        />
        <div className="bg-black/15 absolute z-20 size-full " />
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
            <p className=" bg-[#a66a21] text-white w-fit text-xs px-3 rounded-full p-1">
              For Workers
            </p>
            <h2 className="text-white text-2xl sm:text-4xl font-semibold">
              Your work
              <br /> makes it <span className="text-[#f0782d]">grow.</span>
            </h2>
            <p className="text-sm sm:text-base text-white max-w-full sm:max-w-[380px] font-normal">
              S.F.M.S helps you view tasks, log your work and stay updated -
              anytime, anywhere.
            </p>
          </div>
          <div className="flex flex-col  gap-3 ">
            {managements.map((b) => (
              <div
                key={b.text}
                className="text-white w-full gap-2 flex items-center  rounded-md"
              >
                <div className="text-xl bg-[#a66a21] rounded-md size-8 flex items-center justify-center text-white">
                  {b.icon}
                </div>
                <p className="text-center text-sm">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
