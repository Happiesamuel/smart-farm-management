import React from "react";

import Farm4 from "@/public/farm-4.jpg";
import Farm5 from "@/public/farm-5.jpg";
import Farm6 from "@/public/farm-6.jpg";
import Image from "next/image";
import { PiFarm, PiPlantDuotone } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { MdArrowForwardIos } from "react-icons/md";
import Paginate from "../../layout/Pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaRegTrashCan } from "react-icons/fa6";
const farms = [
  {
    id: 1,
    name: "Field A",
    status: "Active",
    image: Farm4,
    size: 2.5,
    soiltype: "Loamy",
    currentCrop: "Maize",
    lastIrrigation: "2 days ago",
  },
  {
    id: 2,
    name: "Field B",
    status: "Active",
    image: Farm5,
    size: 1.8,
    soiltype: "Clay",
    currentCrop: "Rice",
    lastIrrigation: "1 day ago",
  },
  {
    id: 3,
    name: "Field C",
    status: "Active",
    image: Farm6,
    size: 2.2,
    soiltype: "Sandy Loam",
    currentCrop: "Tomatoes",
    lastIrrigation: "3 days ago",
  },
];
export default function FarmFieldList() {
  return (
    <div className="py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {farms.map((farm) => (
          <div
            className=" w-full group  bg-white max-w-sm mx-auto rounded-xl border border-border/80  hover:shadow-sm transition-all duration-500 hover:-translate-y-1"
            key={farm.id}
          >
            <div className="relative h-[120px] overflow-hidden w-full aspect-video">
              <Image
                src={farm.image}
                placeholder="blur"
                fill
                alt="farm-img"
                className="object-center group-hover:scale-[1.5] transition-all duration-500  rounded-t-xl w-full h-full object-cover"
              />
            </div>

            <div className="p-3 space-y-3">
              <div className="flex items-center gap-2">
                <h6 className="text-sm text-dark font-semibold">{farm.name}</h6>
                <p
                  className={`rounded-full ${farm.status === "Active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} p-1 px-2 text-xs `}
                >
                  {farm.status}
                </p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2">
                  <div className="space-y-1">
                    <p className="font-normal text-zinc-500 text-xs">Size</p>
                    <p className="font-semibold text-dark text-sm">
                      {farm.size} arces
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-normal text-zinc-500 text-xs">
                      Soil Type
                    </p>
                    <p className="font-semibold text-dark text-sm">
                      {farm.soiltype}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="space-y-1">
                    <p className="font-normal text-zinc-500 text-xs">
                      Current Crop
                    </p>
                    <p className="font-semibold text-dark text-sm">
                      {farm.currentCrop}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-normal text-zinc-500 text-xs">
                      Last Irrigation
                    </p>
                    <p className="font-semibold text-dark text-sm">
                      {farm.lastIrrigation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 py-2.5">
                <div className="flex gap-2 items-center flex-1">
                  <Button className="bg-transparent w-[48%] font-medium  border border-primary-green cursor-pointer rounded-md text-primary-green">
                    <Link href={`/user/farms/1/fieldId`} className="w-full">
                      {" "}
                      View Details
                    </Link>
                  </Button>
                  <Button className="bg-transparent w-[48%] rounded-md  border border-dark/60 cursor-pointer text-dark">
                    Edit
                  </Button>
                </div>
                <Button className="bg-transparent rounded-md  border border-red-500 cursor-pointer text-red-500">
                  <FaRegTrashCan />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Paginate />
    </div>
  );
}
