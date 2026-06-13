"use client";
import Image from "next/image";
import Paginate from "../../layout/Pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaRegTrashCan } from "react-icons/fa6";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/stores/useAppStore";
import { useDebounce } from "use-debounce";
import FieldHeader from "./FieldHeader";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useGetFarmFields } from "@/hooks/fields/useFields";
import { useGetFarmCrops } from "@/hooks/crops/useCrops";

export default function FarmFieldList({
  setOpenId,
}: {
  setOpenId: Dispatch<SetStateAction<string | null>>;
}) {
  const { workspaceId, farmId } = useParams();
  const { workspace, user, ready } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fields, status, error } = useGetFarmFields(
    workspace?.id ?? null,
    user?.id || null,
    farmId as string,
  );
  const {
    crops,
    status: cropStat,
    error: cropErr,
  } = useGetFarmCrops(
    workspace?.id ?? null,
    user?.id || null,
    farmId as string,
  );
  const searchFromUrl = searchParams.get("search") || "";

  const [val, setVal] = useState(searchFromUrl);

  const [debouncedValue] = useDebounce(val, 500);
  const isFirstRender = useRef(true);

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

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }, [debouncedValue]);

  if (!ready)
    return (
      <div className="h-70">
        <FormLoader>Loading app...</FormLoader>
      </div>
    );
  if (!user || !workspace)
    return (
      <div className="h-70">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading = status === "pending" || cropStat === "pending";

  if (isLoading)
    return (
      <div className="h-70">
        <FormLoader>Loading fields...</FormLoader>
      </div>
    );

  const errorMessage = error?.message || cropErr?.message;

  if (errorMessage)
    return (
      <div className="h-70">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  if (!fields?.length)
    return (
      <div className="h-70">
        <NoResult>No field in this Farm</NoResult>
      </div>
    );

  function handleSearchField(v: string) {
    setVal(v);
  }

  const cropsByField = new Map<string, { [key: string]: string }[]>();
  const isActiveStage = (stage: string) =>
    ["seedling", "vegetative", "flowering", "fruiting"].includes(stage);
  crops?.forEach((crop) => {
    const fieldId = crop.fields;

    if (!cropsByField.has(fieldId)) {
      cropsByField.set(fieldId, []);
    }

    cropsByField.get(fieldId)?.push(crop);
  });
  const fieldArr =
    fields?.map((field) => {
      const fieldCrops = cropsByField.get(field.$id) || [];

      const hasActiveCrop = fieldCrops.some(
        (crop) => isActiveStage(crop.growthStage), // or isActiveStatus(crop.status)
      );

      return {
        id: field.$id,
        image: field.fieldImage,
        name: field.fieldName,
        size: field.size,
        sizeUnit: field.sizeUnit,
        soilType: field.soilType,

        // 💡 derived status
        status: hasActiveCrop ? "Active" : "Inactive",

        // optional extras (very useful)
        totalCrops: fieldCrops.length,
        activeCrops: fieldCrops.filter((c) => isActiveStage(c.growthStage))
          .length,
      };
    }) ?? [];

  const query = debouncedValue?.toLowerCase().replace(/\+/g, " ").trim();

  const filteredFarm = fieldArr.filter((field) => {
    const matchesSearch = query
      ? field.name.toLowerCase().startsWith(query) ||
        field.name.toLowerCase().includes(query)
      : true;

    return matchesSearch;
  });

  const PAGE_SIZE = 6;

  const currentPage = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil(filteredFarm.length / PAGE_SIZE);
  const paginatedField = filteredFarm.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );
  return (
    <>
      <FieldHeader
        num={fields.length}
        handleSearch={handleSearchField}
        val={val}
      />
      <div className="py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {paginatedField.map((farm) => (
            <div
              className=" w-full group  bg-white max-w-sm mx-auto rounded-xl border border-border/80  hover:shadow-sm transition-all duration-500 hover:-translate-y-1"
              key={farm.id}
            >
              <div className="relative h-[120px] overflow-hidden w-full aspect-video">
                <Image
                  src={farm.image}
                  fill
                  alt="farm-img"
                  className="object-center group-hover:scale-[1.5] transition-all duration-500  rounded-t-xl w-full h-full object-cover"
                />
              </div>

              <div className="p-3 space-y-3">
                <div className="flex items-center gap-2">
                  <h6 className="text-sm text-dark font-semibold">
                    {farm.name}
                  </h6>
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
                        {farm.size} {farm.sizeUnit}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-normal text-zinc-500 text-xs">
                        Soil Type
                      </p>
                      <p className="font-semibold text-dark text-sm">
                        {farm.soilType}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="space-y-1">
                      <p className="font-normal text-zinc-500 text-xs">
                        Active Crops
                      </p>
                      <p className="font-semibold text-dark text-sm">
                        {farm.activeCrops}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-normal text-zinc-500 text-xs">
                        Total Crops
                      </p>
                      <p className="font-semibold text-dark text-sm">
                        {farm.totalCrops}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2.5">
                  <div className="flex gap-2 items-center flex-1">
                    <Button className="bg-transparent w-[48%] font-medium  border border-primary-green cursor-pointer rounded-md text-primary-green">
                      <Link
                        href={`/user/${workspaceId}/farms/${farmId}/${farm.id}`}
                        className="w-full"
                      >
                        {" "}
                        View Details
                      </Link>
                    </Button>
                    <Button className="bg-transparent w-[48%] rounded-md  border border-dark/60 cursor-pointer text-dark">
                      Edit
                    </Button>
                  </div>
                  <Button
                    onClick={() => setOpenId(farm.id)}
                    className="bg-transparent rounded-md  border border-red-500 cursor-pointer text-red-500"
                  >
                    <FaRegTrashCan />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Paginate totalPages={totalPages} />
      </div>
    </>
  );
}
