"use client";
import { useSearchParams } from "next/navigation";

export function useCropFilter() {
  const searchParams = useSearchParams();

  const farm = searchParams.get("farm");
  const field = searchParams.get("field");
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const quality = searchParams.get("quality");
  const priority = searchParams.get("priority");
  const assign = searchParams.get("assign");

  function filterCrop<
    T extends {
      farm?: string;
      crop?: string;
      field?: string;
      status?: string;
      name?: string;
      quality?: string;
      priority?: string;
      assignTo?: string;
      taskTitle?: string;
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
        priority &&
        priority !== "all" &&
        item.priority?.toLowerCase() !== priority
      )
        return false;
      if (
        assign &&
        assign !== "all" &&
        item?.assignTo !== assign.split("-").at(1)
      )
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
        const matchesTaskTitle = item.taskTitle?.toLowerCase().includes(q);
        const matchesCrop = item.crop?.toLowerCase().includes(q);
        if (!matchesName && !matchesCrop && !matchesTaskTitle) return false;
      }

      return true;
    });
  }

  return { farm, filterCrop };
}
