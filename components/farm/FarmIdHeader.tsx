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
export default function FarmIdHeader() {
  const { workspaceId, farmId } = useParams();
  const { user, workspace, ready } = useApp();
  const { farm, status, error } = useGetSingleFarm(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  if (status === "pending" && !ready) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log(farm, "ssf", status);
  return (
    <p>sam</p>
    // <div className="space-y-4">
    //   <div className=" flex items-center gap-3 text-sm text-zinc-500 font-normal">
    //     <Link
    //       className="duration-500 transition-all cursor-pointer hover:text-green-500"
    //       href={`/user/${workspaceId}/farms`}
    //     >
    //       Farms
    //     </Link>
    //     <MdArrowForwardIos />
    //     <Link
    //       className="duration-500 transition-all cursor-pointer hover:text-green-500"
    //       href={`/user/${workspaceId}/farms/${farmId}`}
    //     >s
    //       {farms.farmName}
    //     </Link>
    //   </div>
    //   <div className="flex gap-4 sm:flex-row flex-col sm:items-center justify-between">
    //     <div className="space-y-3.5">
    //       <div className="flex items-center gap-2">
    //         <h5 className="text-xl text-dark font-semibold">
    //           Green Valley Farm
    //         </h5>
    //         <p
    //           className={`rounded-full bg-green-50 text-green-600 p-0.5 px-2 text-xs border-green-200 border`}
    //           // className={`rounded-full ${farm.status === "Active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} p-1 px-2 text-xs absolute left-2 top-2`}
    //         >
    //           Active
    //         </p>
    //       </div>
    //       <div className="flex items-center gap-4">
    //         <div className="flex items-center gap-0.5">
    //           <IoLocationOutline className="text-zinc-500" />
    //           <p className="text-sm text-zinc-500 font-medium">
    //             {formatLocation(farms.address)}
    //           </p>
    //         </div>
    //         <span className={`size-1 rounded-full shrink-0 bg-zinc-500`} />
    //         <p className="text-sm text-zinc-500 font-medium">120 acres</p>
    //       </div>
    //     </div>
    //     <div className="flex items-center gap-3">
    //       <Button className="bg-transparent w-[48%] sm:w-fit border border-border cursor-pointer text-dark">
    //         <p>Edit Field</p>
    //       </Button>
    //       <Button className="bg-primary-green w-[48%] sm:w-fit cursor-pointer text-white">
    //         <Link
    //           href={`/user/${workspaceId}/farms/${farmId}/create-field`}
    //           className="flex items-center gap-1"
    //         >
    //           <GoPlus />
    //           <p>Add Field</p>
    //         </Link>
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}
