"use client";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import { PiFarm, PiPlantDuotone } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import { MdArrowForwardIos } from "react-icons/md";
import Paginate from "../layout/Pagination";
import Link from "next/link";
import { useGetFarmsWithStats } from "@/hooks/farms/useFarm";
import { useApp } from "@/stores/useAppStore";
import { FormLoader } from "../loader/GeneralLoader";
import FarmFilter from "./FarmFilter";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FarmList() {
  const { workspace, user, ready } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchFromUrl = searchParams.get("search") || "";

  const [val, setVal] = useState(searchFromUrl);

  const [debouncedValue] = useDebounce(val, 500);
  const isFirstRender = useRef(true);
  const locationFromUrl = searchParams.get("location") || "";
  const [location, setLocation] = useState(locationFromUrl);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedValue) {
      params.set("search", debouncedValue);
    } else {
      params.delete("search");
    }

    if (location && location !== "all") {
      params.set("location", location);
    } else {
      params.delete("location");
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }, [debouncedValue, location]);
  const { farms, status } = useGetFarmsWithStats(
    workspace?.id ?? null,
    user?.id ?? null,
  );

  if (status === "pending" || !ready)
    return (
      <div className="h-85">
        <FormLoader>Loading farms...</FormLoader>
      </div>
    );

  if (!farms?.length) return <p>no farm</p>;

  function handleSearchFarm(v: string) {
    setVal(v);
  }
  function handleLocationFarm(v: string) {
    setLocation(v);
  }

  const query = debouncedValue?.toLowerCase().replace(/\+/g, " ").trim();

  const filteredFarm = farms.filter((farm) => {
    const matchesSearch = query
      ? farm.name.toLowerCase().startsWith(query) ||
        farm.name.toLowerCase().includes(query)
      : true;

    const matchesLocation =
      locationFromUrl && locationFromUrl !== "all"
        ? farm.location.toLowerCase().split(" ").join("+") === locationFromUrl
        : true;

    return matchesSearch && matchesLocation;
  });

  const PAGE_SIZE = 6;

  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(filteredFarm.length / PAGE_SIZE);
  const paginatedFarms = filteredFarm.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  const locations = [
    { id: 0, name: "All locations", value: "all" },
    ...[...new Set(farms.map((x) => x.location))].map((x, i) => ({
      id: i + 1,
      name: x,
      value: x.toLowerCase().split(" ").join("+"),
    })),
  ];
  return (
    <>
      <FarmFilter
        locations={locations}
        location={location}
        val={val}
        handleSearch={handleSearchFarm}
        handleLocation={handleLocationFarm}
      />
      <div className="py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full  mx-auto">
          {paginatedFarms.map((farm) => {
            const status =
              farm.status === "active" && farm.totalFields > 0
                ? "active"
                : "inactive";
            return (
              <div
                className=" w-full group  bg-white max-w-sm xl:max-w-lg mx-auto rounded-xl border border-border/80  hover:shadow-sm transition-all duration-500 hover:-translate-y-1"
                key={farm.id}
              >
                <div className="relative h-[160px] overflow-hidden w-full aspect-video">
                  <Image
                    src={farm.image}
                    blurDataURL={farm.image}
                    placeholder="blur"
                    fill
                    alt="farm-img"
                    className="object-center group-hover:scale-[1.5] transition-all duration-500  rounded-t-xl w-full h-full object-cover"
                  />

                  <p
                    className={`rounded-full ${status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} p-1 px-2 text-xs absolute left-2 top-2`}
                  >
                    {status}
                  </p>
                </div>

                <div className="p-3">
                  <div className="space-y-1">
                    <h6 className="text-sm text-dark font-semibold">
                      {farm.name}
                    </h6>
                    <p className="text-xs text-zinc-500 font-normal">
                      {farm.location}
                    </p>
                  </div>
                  <div className="flex items-center pt-4 justify-between">
                    <div className="flex items-center flex-col gap-0.5">
                      <div className="flex items-center gap-1">
                        <PiFarm className="text-sm text-primary-green" />
                        <p className="text-xs text-zinc-500 font-normal">
                          Fields
                        </p>
                      </div>
                      <p className="font-semibold text-sm text-dark">
                        {farm.totalFields}
                      </p>
                    </div>
                    <div className="flex items-center flex-col gap-0.5">
                      <div className="flex items-center gap-1">
                        <PiPlantDuotone className="text-sm text-primary-green" />
                        <p className="text-xs text-zinc-500 font-normal">
                          Crops
                        </p>
                      </div>
                      <p className="font-semibold text-sm text-dark">
                        {farm.totalCrops}
                      </p>
                    </div>
                    <div className="flex items-center flex-col gap-0.5">
                      <div className="flex items-center gap-1">
                        <GiMoneyStack className="text-sm text-primary-green" />
                        <p className="text-xs text-zinc-500 font-normal">
                          Harvests
                        </p>
                      </div>
                      <p className="font-semibold text-sm text-dark">
                        {farm.totalHarvest}
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/user/${workspace?.workspaceId}/farms/${farm.id}`}
                  className="flex items-center cursor-pointer px-3 justify-between border-t border-border py-4"
                >
                  <p className="text-sm text-dark font-medium">View Details</p>
                  <MdArrowForwardIos className="text-sm text-dark font-medium" />
                </Link>
              </div>
            );
          })}
        </div>
        <Paginate totalPages={totalPages} />
      </div>
    </>
  );
}
// status: farmFields.length > 0 ? "Active" : "Inactive"
// status: totalRevenue > 0 ? "Active" : "Inactive"
