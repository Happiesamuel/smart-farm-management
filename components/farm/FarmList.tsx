import React from "react";
import Farm1 from "@/public/farm-1.jpg";
import Farm2 from "@/public/farm-2.jpg";
import Farm3 from "@/public/farm-3.png";
import Farm4 from "@/public/farm-4.jpg";
import Farm5 from "@/public/farm-5.jpg";
import Farm6 from "@/public/farm-6.jpg";
import Image from "next/image";
import { PiFarm, PiPlantDuotone } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { MdArrowForwardIos } from "react-icons/md";
import Paginate from "../layout/Pagination";
const farms = [
  {
    id: 1,
    name: "Green Valley Farm",
    image: Farm1,
    location: "Abuja, Nigeria",
    totalFields: 4,
    totalCrops: 6,
    revenue: "₦120,000",
    status: "Active",
  },
  {
    id: 2,
    name: "Sunrise Organic Farm",
    image: Farm2,
    location: "Kano, Nigeria",
    totalFields: 5,
    totalCrops: 7,
    revenue: "₦98,000",
    status: "Active",
  },
  {
    id: 3,
    name: "Golden Harvest Farm",
    image: Farm3,
    location: "Kaduna, Nigeria",
    totalFields: 6,
    totalCrops: 5,
    revenue: "₦150,000",
    status: "Active",
  },
  {
    id: 4,
    name: "Riverbank Agro Farm",
    image: Farm4,
    location: "Benue, Nigeria",
    totalFields: 3,
    totalCrops: 4,
    revenue: "₦85,000",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Savannah Crop Farm",
    image: Farm5,
    location: "Jos, Nigeria",
    totalFields: 7,
    totalCrops: 8,
    revenue: "₦175,000",
    status: "Active",
  },
  {
    id: 6,
    name: "Evergreen Plantation",
    image: Farm6,
    location: "Ibadan, Nigeria",
    totalFields: 5,
    totalCrops: 6,
    revenue: "₦132,000",
    status: "Active",
  },
];
export default function FarmList() {
  return (
    <div className="py-4">
      <div className="grid grid-cols-3 gap-4 w-full">
        {farms.map((farm) => (
          <div
            className=" w-full group  bg-white  rounded-xl border border-border/80  hover:shadow-sm transition-all duration-500 hover:-translate-y-1"
            key={farm.id}
          >
            <div className="relative h-[160px] overflow-hidden w-full aspect-video">
              <Image
                src={farm.image}
                placeholder="blur"
                fill
                alt="farm-img"
                className="object-center group-hover:scale-[1.5] transition-all duration-500  rounded-t-xl w-full h-full object-cover"
              />

              <p
                className={`rounded-full ${farm.status === "Active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} p-1 px-2 text-xs absolute left-2 top-2`}
              >
                {farm.status}
              </p>
            </div>

            <div className="p-3">
              <div className="space-y-1">
                <h6 className="text-sm text-dark font-semibold">{farm.name}</h6>
                <p className="text-xs text-zinc-500 font-normal">
                  {farm.location}
                </p>
              </div>
              <div className="flex items-center pt-4 justify-between">
                <div className="flex items-center flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <PiFarm className="text-sm text-primary-green" />
                    <p className="text-xs text-zinc-500 font-normal">Fields</p>
                  </div>
                  <p className="font-semibold text-sm text-dark">
                    {farm.totalFields}
                  </p>
                </div>
                <div className="flex items-center flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <PiPlantDuotone className="text-sm text-primary-green" />
                    <p className="text-xs text-zinc-500 font-normal">Crops</p>
                  </div>
                  <p className="font-semibold text-sm text-dark">
                    {farm.totalCrops}
                  </p>
                </div>
                <div className="flex items-center flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <GiMoneyStack className="text-sm text-primary-green" />
                    <p className="text-xs text-zinc-500 font-normal">Crops</p>
                  </div>
                  <p className="font-semibold text-sm text-dark">
                    {farm.totalCrops}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center cursor-pointer px-3 justify-between border-t border-border py-2.5">
              <p className="text-sm text-dark font-medium">View Details</p>
              <MdArrowForwardIos className="text-sm text-dark font-medium" />
            </div>
          </div>
        ))}
      </div>
      <Paginate />
    </div>
  );
}
