"use client";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { Button } from "../ui/button";
import { GoPlus } from "react-icons/go";
import { LuMountain } from "react-icons/lu";
import { useParams } from "next/navigation";
import { useApp } from "@/stores/useAppStore";
import { useGetSingleField } from "@/hooks/fields/useFields";
import { FormLoader, NoResult } from "../loader/GeneralLoader";
import { useGetSingleFarm } from "@/hooks/farms/useFarm";
import { formatLocation } from "@/lib/functions";
import FieldTab from "./FieldTab";
import { PiFarm } from "react-icons/pi";

export default function FieldHeader() {
  const { workspaceId, farmId, fieldId } = useParams();
  const { user, workspace, ready } = useApp();
  const {
    farm,
    status: farmStat,
    error: farmErr,
  } = useGetSingleFarm(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  const { field, status, error } = useGetSingleField(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
    fieldId as string,
  );
  if (status === "pending" || farmStat === "pending" || !ready)
    return (
      <div className="h-[150px]">
        <FormLoader>Loading field...</FormLoader>
      </div>
    );
  const err = error?.message || farmErr?.message;
  if (err)
    return (
      <div className="h-[150px]">
        <NoResult>{err}</NoResult>;
      </div>
    );
  const arrSize = [
    {
      name: "acres",
      value: "acres",
    },
    {
      name: "hectares",
      value: "hectares",
    },
    {
      name: "square.m",
      value: "square.m",
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
          <MdArrowForwardIos />
          <Link
            className="duration-500 transition-all cursor-pointer hover:text-green-500"
            href={`/user/${workspaceId}/farms/${farm?.id}/${field?.id}`}
          >
            {field?.fieldName}
          </Link>
        </div>
        <div className="flex gap-4 md:flex-row flex-col md:items-center justify-between">
          <div className="space-y-3.5 ">
            <div className="flex items-center gap-2">
              <h5 className="text-xl text-dark font-semibold">
                {field?.fieldName}
              </h5>
              <p
                className={`rounded-full ${field?.status === "active" ? "bg-green-50 text-green-600 border-green-200 border" : "bg-red-50 text-red-600 border-red-200 border"} p-1 px-2 text-xs `}
              >
                {field?.status}
              </p>
            </div>
            <div className="flex items-center gap-4 no-scroll">
              <div className="flex items-center truncate gap-0.5">
                <PiFarm className="text-zinc-500" />
                <p className="text-sm text-zinc-500 font-medium">
                  {farm?.farmName}
                </p>
              </div>
              <span className={`size-1 rounded-full shrink-0 bg-zinc-500`} />
              <p className="text-sm text-zinc-500 truncate font-medium">
                {field?.size}{" "}
                {arrSize.find((x) => x.value === field?.sizeUnit)?.name}
              </p>
              <span className={`size-1 rounded-full shrink-0 bg-zinc-500`} />
              <div className="flex truncate items-center gap-0.5">
                <LuMountain className="text-zinc-500" />
                <p className="text-sm text-zinc-500 font-medium">
                  {field?.soilType}
                </p>
              </div>
              <span className={`size-1 rounded-full shrink-0 bg-zinc-500`} />
              <div className="flex items-center truncate gap-0.5">
                <IoLocationOutline className="text-zinc-500" />
                <p className="text-sm text-zinc-500 font-medium">
                  {formatLocation(farm?.address)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-transparent w-[48%] sm:w-fit border border-border cursor-pointer text-dark">
              <p>Edit Field</p>
            </Button>
            <Button className="bg-primary-green w-[48%] sm:w-fit cursor-pointer text-white">
              <Link
                href={`/user/${workspaceId}/farms/1/fieldId/create-activity`}
                className="flex items-center gap-1"
              >
                <GoPlus />
                <p>Record Activity</p>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <FieldTab />
    </>
  );
}
