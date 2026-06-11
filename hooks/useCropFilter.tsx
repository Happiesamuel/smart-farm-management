"use client";
import { useSearchParams } from "next/navigation";

export function useCropFilter() {
  const searchParams = useSearchParams();

  const farm = searchParams.get("farm");
  const field = searchParams.get("field");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  function filterCrop<
    T extends {
      farm?: string;
      crop?: string;
      field?: string;
      status?: string;
      name?: string;
    },
  >(items: T[]): T[] {
    return items.filter((item) => {
      if (farm && farm !== "all" && item.farm !== farm.split("+").join(" "))
        return false;
      if (field && field !== "all" && item.field !== field.split("+").join(" "))
        return false;
      if (status && status !== "all" && item.status?.toLowerCase() !== status)
        return false;
      if (search && !item.name?.toLowerCase().startsWith(search.toLowerCase()))
        return false;

      return true;
    });
  }

  return { farm, filterCrop };
}
