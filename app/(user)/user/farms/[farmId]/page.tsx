"use client";
import FarmCrops from "@/components/farm/crops/FarmCrops";
import FarmIdHeader from "@/components/farm/FarmIdHeader";
import FarmTab from "@/components/farm/FarmTab";
import FarmFields from "@/components/farm/fields/FarmFields";
import FarmFinance from "@/components/farm/finance/FarmFinance";
import FarmHarvest from "@/components/farm/harvest/FarmHarvest";
import FarmOverview from "@/components/farm/overview/FarmOverview";
import FarmTasks from "@/components/farm/tasks/FarmTasks";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type Tab = "overview" | "fields" | "crops" | "tasks" | "finance" | "harvests";
export default function Page() {
  const tabs: Record<Tab, ReactNode> = {
    overview: <FarmOverview />,
    fields: <FarmFields />,
    crops: <FarmCrops />,
    tasks: <FarmTasks />,
    harvests: <FarmHarvest />,
    finance: <FarmFinance />,
  };
  const searchParmas = useSearchParams();
  const tab = (searchParmas.get("tab") || "overview") as Tab;
  return (
    <div className="pt-18 px-2 sm:px-4">
      <FarmIdHeader />
      <FarmTab />
      <main>{tabs[tab]}</main>
    </div>
  );
}
