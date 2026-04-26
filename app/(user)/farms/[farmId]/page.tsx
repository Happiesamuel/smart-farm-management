"use client";
import FarmCrops from "@/components/farm/crops/FarmCrops";
import FarmIdHeader from "@/components/farm/FarmIdHeader";
import FarmTab from "@/components/farm/FarmTab";
import FarmFields from "@/components/farm/fields/FarmFields";
import FarmOverview from "@/components/farm/overview/FarmOverview";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
type Tab = "overview" | "fields" | "crops";
export default function Page() {
  const tabs: Record<Tab, ReactNode> = {
    overview: <FarmOverview />,
    fields: <FarmFields />,
    crops: <FarmCrops />,
  };
  const searchParmas = useSearchParams();
  const tab = (searchParmas.get("tab") || "overview") as Tab;
  return (
    <div className="pt-18 px-2 sm:px-4">
      <FarmIdHeader />
      <FarmTab />
      <div>{tabs[tab]}</div>
    </div>
  );
}
