"use client";
import { useSearchParams } from "next/navigation";

export function useCropFilter() {
  const searchParams = useSearchParams();

  const farm = searchParams.get("farm");
  const field = searchParams.get("field");
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const quality = searchParams.get("quality");

  function filterCrop<
    T extends {
      farm?: string;
      crop?: string;
      field?: string;
      status?: string;
      name?: string;
      quality?: string;
    },
  >(items: T[]): T[] {
    return items.filter((item) => {
      if (farm && farm !== "all" && item.farm !== farm.split("+").join(" "))
        return false;
      if (field && field !== "all" && item.field !== field.split("+").join(" "))
        return false;
      if (status && status !== "all" && item.status?.toLowerCase() !== status)
        return false;
      if (
        quality &&
        quality !== "all" &&
        item.quality?.toLowerCase() !== quality
      )
        return false;
      if (search) {
        const q = search.toLowerCase();
        const matchesName = item.name?.toLowerCase().includes(q);
        const matchesCrop = item.crop?.toLowerCase().includes(q);
        if (!matchesName && !matchesCrop) return false;
      }

      return true;
    });
  }

  return { farm, filterCrop };
}
