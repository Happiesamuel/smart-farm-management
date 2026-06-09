"use client";
import { Button } from "../ui/button";
import { GoPlus } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";

import { MdArrowForwardIos } from "react-icons/md";
import { useParams } from "next/navigation";
import { useGetSingleFarm } from "@/hooks/farms/useFarm";
import { useApp } from "@/stores/useAppStore";
import { formatLocation } from "@/lib/functions";
import { FormLoader, NoResult } from "../loader/GeneralLoader";
import FarmTab from "./FarmTab";
export default function FarmIdHeader() {
  const { workspaceId, farmId } = useParams();
  const { user, workspace, ready } = useApp();
  const { farm, status, error } = useGetSingleFarm(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  if (status === "pending" || !ready) return <div className="h-[150px]">
    <FormLoader>Loading farm...</FormLoader>
  </div>;
  if (error) return <div className="h-[150px]">
    <NoResult>{error.message}</NoResult>;
    </div>
  const arrSize = [
    {
      name: "acres",
      value: "acre",
    },
    {
      name: "hectares",
      value: "ha",
    },
    {
      name: "square.m",
      value: "mm",
    },
  ];
    
  return (
<>
    <div className="space-y-4">
      <div className=" flex items-center gap-3 text-sm text-zinc-500 font-normal">
        <Link
          className="duration-500 transition-all cursor-pointer hover:text-green-500"
          href={`/user/${workspaceId}/farms`}
        >
          Farms
        </Link>
        <MdArrowForwardIos />
        <Link
          className="duration-500 transition-all cursor-pointer hover:text-green-500"
          href={`/user/${workspaceId}/farms/${farmId}`}
        >
          {farm?.farmName}
        </Link>
      </div>
      <div className="flex gap-4 sm:flex-row flex-col sm:items-center justify-between">
        <div className="space-y-3.5">
          <div className="flex items-center gap-2">
            <h5 className="text-xl text-dark font-semibold">
      {farm?.farmName}
            </h5>
            <p
              className={`rounded-full ${farm?.status === "active" ? "bg-green-50 text-green-600 border-green-200 border" : "bg-red-50 text-red-600 border-red-200 border"} p-1 px-2 text-xs `}
            >
          {farm?.status}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <IoLocationOutline className="text-zinc-500" />
              <p className="text-sm text-zinc-500 font-medium">
                {formatLocation(farm?.address)}
              </p>
            </div>
            <span className={`size-1 rounded-full shrink-0 bg-zinc-500`} />
            <p className="text-sm text-zinc-500 font-medium">{farm?.size} {arrSize.find(x=> x.value === farm?.unit)?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-transparent w-[48%] sm:w-fit border border-border cursor-pointer text-dark">
            <p>Edit Field</p>
          </Button>
          <Button className="bg-primary-green w-[48%] sm:w-fit cursor-pointer text-white">
            <Link
              href={`/user/${workspaceId}/farms/${farmId}/create-field`}
              className="flex items-center gap-1"
            >
              <GoPlus />
              <p>Add Field</p>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  <FarmTab />
</>
  );
}
