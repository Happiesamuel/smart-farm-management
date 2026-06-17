"use client";
import { useGetCrops } from "@/hooks/crops/useCrops";
import { GiDigDug } from "react-icons/gi";
import { GrGrow } from "react-icons/gr";
import { LuFlower } from "react-icons/lu";
import { RiLandscapeLine } from "react-icons/ri";
import { TbPlant2 } from "react-icons/tb";
import { NoResult } from "../loader/GeneralLoader";
import { useApp } from "@/stores/useAppStore";
import { Skeleton } from "../ui/skeleton";
import { toAcres } from "@/lib/functions";

export default function CropBoxes() {
  const { workspace, user, ready } = useApp();
  const { crops, status, error } = useGetCrops(
    workspace?.id ?? null,
    user?.id ?? null,
  );

  if (!ready)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 pb-4 lg:grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-30 w-full bg-zinc-200/80" />
        ))}
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-70">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading = status === "pending";

  if (isLoading)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 pb-4 lg:grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-30 w-full bg-zinc-200/80" />
        ))}
      </div>
    );

  const errorMessage = error?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  const totalCrops = crops?.length ?? 0;
  const growingCrops =
    crops?.filter((x) => x.status === "growing")?.length ?? 0;
  const floweringCrops =
    crops?.filter((x) => x.growthStage === "flowering").length ?? 0;
  const harvestedCrops =
    crops?.filter((x) => x.status === "harvested").length ?? 0;
  const totalAreaPlanted =
    crops?.reduce((acc, crop) => {
      return (
        acc + toAcres(Number(crop.areaPlanted || 0), crop.areaUnit as string)
      );
    }, 0) ?? 0;

  const formattedArea = `${totalAreaPlanted.toFixed(2)} arces`;
  const stats = [
    {
      num: totalCrops,
      name: "Total Crops",
      icon: <TbPlant2 />,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      sub: "All Time",
      border: "border-blue-100",
    },
    {
      num: growingCrops,
      name: "Growing",
      icon: <GrGrow />,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      sub: "Currently",
      border: "border-green-100",
    },
    {
      num: floweringCrops,
      name: "Flowering",
      icon: <LuFlower />,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      border: "border-orange-100",
      sub: "Currently",
    },
    {
      num: harvestedCrops,
      name: "Harvested",
      icon: <GiDigDug />,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      border: "border-orange-100",
      sub: "This Season",
    },
    {
      num: formattedArea,
      name: "Total Area Planted",
      icon: <RiLandscapeLine />,
      iconColor: "bg-[#e7f5eb] text-[#056b36] ",
      bg: "bg-[#f5faf6]",
      border: "border-green-100",
      sub: "This Season",
    },
  ];
  return (
    <div className="pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 gap-2">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`px-4 py-4 rounded-md border ${item.bg} ${item.border} flex sm:flex-row flex-col items-center md:items-start gap-3`}
          >
            <div
              className={`text-xl size-8 flex items-center justify-center rounded-md ${item.iconColor}`}
            >
              {item.icon}
            </div>

            <div className="text-center sm:text-left space-y-1">
              <p className="text-sm text-dark/80 font-medium">{item.name}</p>
              <h3 className={`text-xl font-medium text-dark `}>{item.num}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
