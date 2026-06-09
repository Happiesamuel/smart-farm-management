import { useSearchParams } from "next/navigation";

export function useFinanceFilters() {
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  function filterByDate<T extends { date: string }>(items: T[]): T[] {
    if (!from && !to) return items;
    return items.filter((item) => {
      const itemDate = new Date(item.date);
      const fromDate = from ? new Date(from) : null;
      const toDate = to ? new Date(to) : null;
      if (fromDate && itemDate < fromDate) return false;
      if (toDate && itemDate > toDate) return false;
      return true;
    });
  }

  return { from, to, filterByDate };
}