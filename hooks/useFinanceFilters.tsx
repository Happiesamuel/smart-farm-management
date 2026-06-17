"use client";
import { usePathname, useSearchParams } from "next/navigation";

export function useFinanceFilters() {
  const pathname = usePathname();
  const slug = pathname.split("/").at(3);
  const searchParams = useSearchParams();
  const cropOrCategory = searchParams
    .get(slug === "sales" ? "crop" : "category")
    ?.toLowerCase();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const farm = searchParams.get("farm");

  function filterByDate<
    T extends { date: string; farm?: string; crop?: string; category?: string },
  >(items: T[]): T[] {
    return items.filter((item) => {
      const itemDate = new Date(item.date);
      const fromDate = from ? new Date(from) : null;
      const toDate = to ? new Date(to) : null;
      if (fromDate && itemDate < fromDate) return false;
      if (toDate && itemDate > toDate) return false;
      if (farm && farm !== "all" && item.farm !== farm.split("+").join(" "))
        return false;
      if (
        cropOrCategory &&
        cropOrCategory !== "all crops" &&
        slug === "sales" &&
        item.crop?.toLowerCase() !== cropOrCategory
      )
        return false;
      if (
        cropOrCategory &&
        cropOrCategory !== "all categories" &&
        slug === "expense" &&
        item.category !== cropOrCategory
      )
        return false;
      return true;
    });
  }

  return { from, to, farm, filterByDate };
}
