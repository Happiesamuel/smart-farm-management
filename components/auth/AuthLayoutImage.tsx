"use client";
import Image from "next/image";
import SelectImg from "../../public/owner.png";
import { useGetUser } from "@/hooks/useGetSession";

export default function AuthLayoutImage() {
  const { data, userStat } = useGetUser();
  if (userStat === "pending") return <div></div>;
  return (
    <div className="h-screen items-center  justify-center hidden lg:flex">
      <div className="relative aspect-auto w-full h-full flex items-center justify-center ">
        <Image
          src={SelectImg}
          alt="img"
          placeholder="blur"
          fill
          className="object-center   object-cover "
          quality={100}
        />
        <div className="bg-black/35 backdrop-blur-[1px] absolute z-20 size-full " />
        <div className="z-20 p-6 flex flex-col  absolute h-full w-full">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center text-white text-lg">
              🌿
            </div>
            <div>
              <div className="font-bold text-white leading-tight text-sm">
                SmartFarm
              </div>
              <div className="text-xs text-gray-100 leading-tight">
                Management System
              </div>
            </div>
          </div>
          <div className="space-y-2 flex-1 justify-end pb-20 flex flex-col">
            <h6 className="text-2xl   text-white font-semibold">
              Welcome back, {data?.fullName.split(" ").at(0)}
            </h6>
            <p className="text-lg  font-normal text-zinc-100">
              Select a workspace to continue managing your farms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
