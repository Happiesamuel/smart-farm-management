"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { FaTrashCan } from "react-icons/fa6";

export default function FarmList({
  farms,
  setOpenId,
}: {
  farms: {
    id: string;
    name: string;
    location: string;
    totalFields: number;
    totalCrops: number;
    status: string;
    img: string;
  }[];
  setOpenId: Dispatch<SetStateAction<string | null>>;
  openModal: boolean;
}) {
  const statusStyles: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-red-100 text-red-700",
  };
  const { workspaceId } = useParams();

  return (
    <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 mx-auto w-full sm:w-[90%] lg:w-full xl:w-[90%] gap-4 mt-6">
      {farms.map((box) => {
        return (
          <div
            key={box.name}
            className="w-full p-4 cursor-pointer h-[100px] max-w-sm gap-4 bg-white items-start justify-cente relative rounded-md border border-border/80 hover:shadow-sm transition flex shrink-0"
          >
            <Link
              href={`/user/${workspaceId}/settings/farm-information/${box.id}`}
              className={`relative aspect-video size-12 flex items-center justify-center  `}
            >
              <Image
                src={box.img}
                className="object-center object-cover  rounded-md"
                alt="img"
                fill
              />
            </Link>
            <div className="space-y-1 w-full">
              <div className="flex items-center w-full justify-between">
                <h6 className="text-dark text-sm">{box.name}</h6>
                <p
                  className={`px-2 py-0.5 text-[12px] rounded-full ${statusStyles[box.status]}`}
                >
                  {box.status}
                </p>
              </div>
              <p className="text-sm text-zinc-500 font-normal">
                {box.location}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm space-x-2 text-zinc-500 font-normal">
                  <span>{box.totalFields} fields</span>
                  <span>{box.totalCrops} crops</span>
                </p>

                <FaTrashCan
                  onClick={() => setOpenId(box.id)}
                  className="text-red-500 text-base"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
